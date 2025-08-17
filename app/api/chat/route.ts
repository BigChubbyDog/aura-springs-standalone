import { NextRequest, NextResponse } from 'next/server';
import { getAIResponse, extractEntities, ChatMessage, ChatContext } from '@/lib/vertexAI';

// Teams webhook URL
const TEAMS_WEBHOOK_URL = process.env.TEAMS_WEBHOOK_URL || '';

// Send chat notification to Teams
async function notifyTeams(
  type: 'new_chat' | 'message' | 'escalation',
  data: {
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    message: string;
    aiResponse?: string;
    sessionId: string;
    isEscalation?: boolean;
  }
) {
  if (!TEAMS_WEBHOOK_URL) return;

  const colors = {
    new_chat: '0078D4',
    message: '00BCF2',
    escalation: 'FF0000'
  };

  const titles = {
    new_chat: '💬 New Chat Started',
    message: '💭 Chat Message',
    escalation: '🚨 ESCALATION REQUIRED'
  };

  try {
    const teamsMessage = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      themeColor: colors[type],
      summary: `${titles[type]} - ${data.userName || 'Anonymous User'}`,
      sections: [
        {
          activityTitle: titles[type],
          activitySubtitle: new Date().toLocaleString(),
          activityImage: 'https://auraspringcleaning.com/logo.png',
          text: type === 'escalation' 
            ? '**Customer needs immediate assistance!**' 
            : 'Live chat activity on website',
          facts: [
            data.userName && { name: 'Customer', value: data.userName },
            data.userEmail && { name: 'Email', value: data.userEmail },
            data.userPhone && { name: 'Phone', value: data.userPhone },
            { name: 'Session ID', value: data.sessionId },
            { name: 'Customer Message', value: data.message },
            data.aiResponse && { name: 'AI Response', value: data.aiResponse },
          ].filter(Boolean)
        }
      ],
      potentialAction: [
        data.userPhone && {
          '@type': 'OpenUri',
          name: '📞 Call Customer',
          targets: [{ os: 'default', uri: `tel:${data.userPhone.replace(/\D/g, '')}` }]
        },
        data.userEmail && {
          '@type': 'OpenUri',
          name: '📧 Email Customer',
          targets: [{ os: 'default', uri: `mailto:${data.userEmail}?subject=Re: Your chat inquiry` }]
        },
        {
          '@type': 'OpenUri',
          name: '💬 View Chat History',
          targets: [{ os: 'default', uri: `https://auraspringcleaning.com/admin/chat/${data.sessionId}` }]
        }
      ].filter(Boolean)
    };

    await fetch(TEAMS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamsMessage)
    });
  } catch (error) {
    console.error('Teams notification error:', error);
  }
}

// Check if message needs escalation
function needsEscalation(message: string, aiResponse: string): boolean {
  const escalationTriggers = [
    'speak to human',
    'talk to someone',
    'real person',
    'manager',
    'complaint',
    'urgent',
    'emergency',
    'not working',
    'frustrated',
    'angry',
    'help me',
    'call me',
    'contact me'
  ];

  const lowerMessage = message.toLowerCase();
  return escalationTriggers.some(trigger => lowerMessage.includes(trigger));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      message, 
      sessionId, 
      userName, 
      userEmail, 
      userPhone,
      conversationHistory = [],
      isNewChat = false 
    } = body;

    // Extract entities from message
    const entities = extractEntities(message);
    
    // Build context
    const context: ChatContext = {
      userName: userName || entities.userName,
      userEmail: userEmail || entities.userEmail,
      userPhone: userPhone || entities.userPhone,
      building: entities.building,
      serviceType: entities.serviceType,
      urgency: entities.urgency,
      conversationHistory
    };

    // Get AI response
    const aiResponse = await getAIResponse(message, context);

    // Check if escalation is needed
    const shouldEscalate = needsEscalation(message, aiResponse);

    // Notify Teams
    if (isNewChat) {
      await notifyTeams('new_chat', {
        userName: context.userName,
        userEmail: context.userEmail,
        userPhone: context.userPhone,
        message,
        aiResponse,
        sessionId
      });
    } else if (shouldEscalate) {
      await notifyTeams('escalation', {
        userName: context.userName,
        userEmail: context.userEmail,
        userPhone: context.userPhone,
        message,
        aiResponse,
        sessionId,
        isEscalation: true
      });
    } else {
      // Send regular message notification every 5th message
      if (conversationHistory.length % 5 === 0) {
        await notifyTeams('message', {
          userName: context.userName,
          userEmail: context.userEmail,
          userPhone: context.userPhone,
          message,
          aiResponse,
          sessionId
        });
      }
    }

    // Store chat in database (optional - for history viewing)
    // await storeChatMessage(sessionId, message, aiResponse, context);

    return NextResponse.json({
      success: true,
      response: aiResponse,
      context: {
        ...context,
        conversationHistory: undefined // Don't send back full history
      },
      shouldEscalate,
      escalationMessage: shouldEscalate 
        ? 'I\'m connecting you with Valerie right away. She\'ll be notified immediately and will respond within minutes!'
        : undefined
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Still notify Teams about the error
    await notifyTeams('escalation', {
      message: `API Error: ${error}`,
      sessionId: 'error-' + Date.now(),
      isEscalation: true
    });

    return NextResponse.json({
      success: false,
      response: 'I apologize for the technical issue. Please call us directly at (512) 781-0527 for immediate assistance.',
      shouldEscalate: true
    }, { status: 500 });
  }
}

// GET endpoint to check chat status
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'online',
    availability: {
      monday: '7:00 AM - 9:00 PM',
      tuesday: '7:00 AM - 9:00 PM',
      wednesday: '7:00 AM - 9:00 PM',
      thursday: '7:00 AM - 9:00 PM',
      friday: '7:00 AM - 9:00 PM',
      saturday: '8:00 AM - 7:00 PM',
      sunday: '9:00 AM - 6:00 PM'
    },
    features: {
      ai_powered: true,
      teams_integration: true,
      escalation: true,
      real_time_notifications: true
    }
  });
}