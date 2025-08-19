/**
 * Power Automate Flow Definitions
 * Automated workflows for Aura Spring Cleaning business processes
 */

/**
 * Flow configurations that need to be created in Power Automate
 * These are the templates and logic for each automation
 */

export const POWER_AUTOMATE_FLOWS = {
  /**
   * Flow 1: New Booking Automation
   * Trigger: When a new booking is created
   */
  NEW_BOOKING_FLOW: {
    name: 'Aura Spring - New Booking Workflow',
    description: 'Automated workflow for processing new bookings',
    trigger: {
      type: 'HTTP Request',
      method: 'POST',
      schema: {
        customerName: 'string',
        customerEmail: 'string',
        customerPhone: 'string',
        serviceType: 'string',
        serviceDate: 'string',
        serviceTime: 'string',
        address: 'string',
        totalPrice: 'number',
        bookingId: 'string'
      }
    },
    actions: [
      {
        step: 1,
        action: 'Create Contact in Dynamics 365',
        connector: 'Dynamics 365',
        operation: 'Create or Update Contact',
        inputs: {
          firstname: '@{split(triggerBody()?[\'customerName\'], \' \')[0]}',
          lastname: '@{split(triggerBody()?[\'customerName\'], \' \')[1]}',
          emailaddress1: '@{triggerBody()?[\'customerEmail\']}',
          telephone1: '@{triggerBody()?[\'customerPhone\']}',
          address1_line1: '@{triggerBody()?[\'address\']}'
        }
      },
      {
        step: 2,
        action: 'Create Calendar Event',
        connector: 'Office 365 Outlook',
        operation: 'Create Event',
        inputs: {
          calendar: 'schedule@auraspringcleaning.com',
          subject: '@{triggerBody()?[\'serviceType\']} - @{triggerBody()?[\'customerName\']}',
          start: '@{triggerBody()?[\'serviceDate\']} @{triggerBody()?[\'serviceTime\']}',
          end: '@{addHours(triggerBody()?[\'serviceDate\'], 3)}',
          location: '@{triggerBody()?[\'address\']}',
          body: 'Booking ID: @{triggerBody()?[\'bookingId\']}\nPrice: $@{triggerBody()?[\'totalPrice\']}'
        }
      },
      {
        step: 3,
        action: 'Send Teams Notification',
        connector: 'Microsoft Teams',
        operation: 'Post Adaptive Card',
        inputs: {
          webhook: process.env.TEAMS_WEBHOOK_URL,
          card: {
            type: 'AdaptiveCard',
            body: [
              {
                type: 'TextBlock',
                text: '🎉 New Booking Received!',
                size: 'Large',
                weight: 'Bolder'
              },
              {
                type: 'FactSet',
                facts: [
                  { title: 'Customer', value: '@{triggerBody()?[\'customerName\']}' },
                  { title: 'Service', value: '@{triggerBody()?[\'serviceType\']}' },
                  { title: 'Date', value: '@{triggerBody()?[\'serviceDate\']}' },
                  { title: 'Price', value: '$@{triggerBody()?[\'totalPrice\']}' }
                ]
              }
            ]
          }
        }
      },
      {
        step: 4,
        action: 'Send Customer Email',
        connector: 'Office 365 Outlook',
        operation: 'Send Email',
        inputs: {
          from: 'booking@auraspringcleaning.com',
          to: '@{triggerBody()?[\'customerEmail\']}',
          subject: 'Booking Confirmation - Aura Spring Cleaning',
          body: 'HTML template with booking details',
          importance: 'Normal'
        }
      },
      {
        step: 5,
        action: 'Send SMS (if urgent)',
        connector: 'Twilio',
        operation: 'Send SMS',
        condition: '@equals(triggerBody()?[\'priority\'], \'urgent\')',
        inputs: {
          to: '@{triggerBody()?[\'customerPhone\']}',
          from: '+17373301489',
          body: 'Your Aura Spring cleaning is confirmed for @{triggerBody()?[\'serviceDate\']}'
        }
      },
      {
        step: 6,
        action: 'Create SharePoint Folder',
        connector: 'SharePoint',
        operation: 'Create Folder',
        inputs: {
          site: 'AuraSpringCleaningTeams',
          library: 'Customers',
          folderPath: 'Active Customers/@{triggerBody()?[\'customerName\']}_@{triggerBody()?[\'bookingId\']}'
        }
      }
    ]
  },

  /**
   * Flow 2: Service Completion Workflow
   */
  SERVICE_COMPLETION_FLOW: {
    name: 'Aura Spring - Service Completion',
    description: 'Process completed service with photos and feedback',
    trigger: {
      type: 'Microsoft Forms',
      form: 'Service Completion Form'
    },
    actions: [
      {
        step: 1,
        action: 'Upload Photos to SharePoint',
        connector: 'SharePoint',
        operation: 'Create File',
        inputs: {
          site: 'AuraSpringCleaningTeams',
          library: 'Service Records',
          folder: 'Before-After Photos/@{formatDateTime(utcNow(), \'yyyy-MM-dd\')}',
          fileName: '@{triggerBody()?[\'bookingId\']}_photos.zip',
          fileContent: '@{triggerBody()?[\'photos\']}'
        }
      },
      {
        step: 2,
        action: 'Update Dynamics 365 Service Record',
        connector: 'Dynamics 365',
        operation: 'Update Record',
        inputs: {
          entity: 'appointments',
          recordId: '@{triggerBody()?[\'appointmentId\']}',
          status: 'Completed',
          actualend: '@{utcNow()}',
          customerrating: '@{triggerBody()?[\'rating\']}'
        }
      },
      {
        step: 3,
        action: 'Generate Invoice',
        connector: 'Dynamics 365',
        operation: 'Create Invoice',
        inputs: {
          customerid: '@{triggerBody()?[\'customerId\']}',
          name: 'Invoice #@{triggerBody()?[\'bookingId\']}',
          totalamount: '@{triggerBody()?[\'totalPrice\']}',
          duedate: '@{addDays(utcNow(), 7)}'
        }
      },
      {
        step: 4,
        action: 'Send Feedback Request',
        connector: 'Office 365 Outlook',
        operation: 'Send Email',
        delay: '1 hour',
        inputs: {
          from: 'hello@auraspringcleaning.com',
          to: '@{triggerBody()?[\'customerEmail\']}',
          subject: 'How was your cleaning experience?',
          body: 'Feedback form link with booking details'
        }
      }
    ]
  },

  /**
   * Flow 3: Quote Request Automation
   */
  QUOTE_REQUEST_FLOW: {
    name: 'Aura Spring - Quote Request Handler',
    description: 'Process quote requests from website',
    trigger: {
      type: 'HTTP Request',
      source: 'Website Quote Form'
    },
    actions: [
      {
        step: 1,
        action: 'Create Lead in Dynamics',
        connector: 'Dynamics 365',
        operation: 'Create Lead',
        inputs: {
          subject: 'Quote Request - @{triggerBody()?[\'serviceType\']}',
          firstname: '@{triggerBody()?[\'name\']}',
          emailaddress1: '@{triggerBody()?[\'email\']}',
          telephone1: '@{triggerBody()?[\'phone\']}',
          estimatedvalue: '@{triggerBody()?[\'estimatedPrice\']}'
        }
      },
      {
        step: 2,
        action: 'Calculate Price',
        connector: 'HTTP',
        operation: 'Call Azure Function',
        inputs: {
          method: 'POST',
          uri: 'https://auraspringfunctions.azurewebsites.net/api/calculatePrice',
          body: {
            bedrooms: '@{triggerBody()?[\'bedrooms\']}',
            bathrooms: '@{triggerBody()?[\'bathrooms\']}',
            squareFeet: '@{triggerBody()?[\'squareFeet\']}',
            serviceType: '@{triggerBody()?[\'serviceType\']}'
          }
        }
      },
      {
        step: 3,
        action: 'Send Quote Email',
        connector: 'Office 365 Outlook',
        operation: 'Send Email',
        inputs: {
          from: 'booking@auraspringcleaning.com',
          to: '@{triggerBody()?[\'email\']}',
          subject: 'Your Cleaning Quote - Aura Spring',
          body: 'Quote details with calculated price',
          attachments: 'Quote PDF generated'
        }
      },
      {
        step: 4,
        action: 'Create Follow-up Task',
        connector: 'Microsoft To-Do',
        operation: 'Create Task',
        inputs: {
          title: 'Follow up on quote - @{triggerBody()?[\'name\']}',
          dueDateTime: '@{addDays(utcNow(), 2)}',
          assignedTo: 'valerie@auraspringcleaning.com'
        }
      }
    ]
  },

  /**
   * Flow 4: Weekly Schedule Distribution
   */
  WEEKLY_SCHEDULE_FLOW: {
    name: 'Aura Spring - Weekly Schedule',
    description: 'Generate and distribute weekly schedules',
    trigger: {
      type: 'Recurrence',
      frequency: 'Week',
      days: ['Sunday'],
      time: '18:00'
    },
    actions: [
      {
        step: 1,
        action: 'Get Next Week Appointments',
        connector: 'Office 365 Outlook',
        operation: 'Get Events',
        inputs: {
          calendar: 'schedule@auraspringcleaning.com',
          from: '@{addDays(utcNow(), 1)}',
          to: '@{addDays(utcNow(), 8)}'
        }
      },
      {
        step: 2,
        action: 'Generate Schedule Document',
        connector: 'OneDrive',
        operation: 'Create File from Template',
        inputs: {
          template: 'WeeklyScheduleTemplate.xlsx',
          data: '@{body(\'Get_Next_Week_Appointments\')}',
          fileName: 'Schedule_Week_@{weekOfYear()}.xlsx'
        }
      },
      {
        step: 3,
        action: 'Upload to SharePoint',
        connector: 'SharePoint',
        operation: 'Create File',
        inputs: {
          site: 'AuraSpringCleaningTeams',
          library: 'Team Resources',
          folder: 'Schedules/@{utcNow(\'yyyy\')}',
          file: '@{outputs(\'Generate_Schedule_Document\')}'
        }
      },
      {
        step: 4,
        action: 'Send to Team',
        connector: 'Office 365 Outlook',
        operation: 'Send Email',
        inputs: {
          from: 'schedule@auraspringcleaning.com',
          to: 'cleaners@auraspringcleaning.com',
          cc: 'management@auraspringcleaning.com',
          subject: 'Weekly Schedule - Week @{weekOfYear()}',
          body: 'Schedule attached',
          attachments: '@{outputs(\'Generate_Schedule_Document\')}'
        }
      },
      {
        step: 5,
        action: 'Post to Teams',
        connector: 'Microsoft Teams',
        operation: 'Post Message',
        inputs: {
          team: 'Aura Spring Cleaning',
          channel: 'General',
          message: 'Weekly schedule has been posted! Check SharePoint for details.'
        }
      }
    ]
  },

  /**
   * Flow 5: Payment Processing
   */
  PAYMENT_PROCESSING_FLOW: {
    name: 'Aura Spring - Payment Processing',
    description: 'Handle payment notifications and updates',
    trigger: {
      type: 'Stripe Webhook',
      event: 'payment_intent.succeeded'
    },
    actions: [
      {
        step: 1,
        action: 'Update Invoice Status',
        connector: 'Dynamics 365',
        operation: 'Update Invoice',
        inputs: {
          invoiceId: '@{triggerBody()?[\'metadata\'][\'invoiceId\']}',
          paymentstatus: 'Paid',
          paymentdate: '@{utcNow()}'
        }
      },
      {
        step: 2,
        action: 'Send Receipt',
        connector: 'Office 365 Outlook',
        operation: 'Send Email',
        inputs: {
          from: 'booking@auraspringcleaning.com',
          to: '@{triggerBody()?[\'receipt_email\']}',
          subject: 'Payment Received - Thank You!',
          body: 'Receipt details',
          attachments: 'Receipt PDF'
        }
      },
      {
        step: 3,
        action: 'Update Customer Record',
        connector: 'Dynamics 365',
        operation: 'Update Contact',
        inputs: {
          contactId: '@{triggerBody()?[\'metadata\'][\'customerId\']}',
          lastpaymentdate: '@{utcNow()}',
          lifetimevalue: '@{add(body(\'Get_Contact\')?[\'lifetimevalue\'], triggerBody()?[\'amount\'])}'
        }
      },
      {
        step: 4,
        action: 'Log in SharePoint',
        connector: 'SharePoint',
        operation: 'Create File',
        inputs: {
          site: 'AuraSpringCleaningTeams',
          library: 'Financial',
          folder: 'Receipts/@{utcNow(\'yyyy/MM\')}',
          fileName: 'Receipt_@{triggerBody()?[\'id\']}.json',
          content: '@{triggerBody()}'
        }
      }
    ]
  },

  /**
   * Flow 6: Customer Feedback Processing
   */
  FEEDBACK_PROCESSING_FLOW: {
    name: 'Aura Spring - Feedback Handler',
    description: 'Process and respond to customer feedback',
    trigger: {
      type: 'Microsoft Forms',
      form: 'Customer Satisfaction Survey'
    },
    actions: [
      {
        step: 1,
        action: 'Update Customer Record',
        connector: 'Dynamics 365',
        operation: 'Update Contact',
        inputs: {
          contactId: '@{triggerBody()?[\'customerId\']}',
          customersatisfaction: '@{triggerBody()?[\'rating\']}',
          lastfeedbackdate: '@{utcNow()}'
        }
      },
      {
        step: 2,
        action: 'Check Rating',
        connector: 'Control',
        operation: 'Condition',
        condition: '@less(triggerBody()?[\'rating\'], 4)',
        ifTrue: [
          {
            action: 'Alert Management',
            connector: 'Microsoft Teams',
            operation: 'Post Urgent Message',
            inputs: {
              channel: 'Management',
              message: '⚠️ Low rating received from @{triggerBody()?[\'customerName\']}: @{triggerBody()?[\'rating\']}/5'
            }
          },
          {
            action: 'Create Follow-up Task',
            connector: 'Microsoft To-Do',
            operation: 'Create Task',
            inputs: {
              title: 'Follow up on low rating - @{triggerBody()?[\'customerName\']}',
              priority: 'High',
              assignedTo: 'valerie@auraspringcleaning.com'
            }
          }
        ],
        ifFalse: [
          {
            action: 'Thank You Email',
            connector: 'Office 365 Outlook',
            operation: 'Send Email',
            inputs: {
              from: 'hello@auraspringcleaning.com',
              to: '@{triggerBody()?[\'email\']}',
              subject: 'Thank you for your feedback!',
              body: 'Appreciation message with discount code'
            }
          }
        ]
      },
      {
        step: 3,
        action: 'Store Feedback',
        connector: 'SharePoint',
        operation: 'Create Item',
        inputs: {
          site: 'AuraSpringCleaningTeams',
          list: 'Customer Feedback',
          item: {
            customer: '@{triggerBody()?[\'customerName\']}',
            rating: '@{triggerBody()?[\'rating\']}',
            comments: '@{triggerBody()?[\'comments\']}',
            date: '@{utcNow()}'
          }
        }
      }
    ]
  },

  /**
   * Flow 7: Emergency Booking Alert
   */
  EMERGENCY_BOOKING_FLOW: {
    name: 'Aura Spring - Emergency Booking Alert',
    description: 'Handle last-minute and emergency bookings',
    trigger: {
      type: 'HTTP Request',
      condition: 'urgency = emergency'
    },
    actions: [
      {
        step: 1,
        action: 'Send SMS to Valerie',
        connector: 'Twilio',
        operation: 'Send SMS',
        inputs: {
          to: '+15127810527',
          from: '+17373301489',
          body: '🚨 EMERGENCY BOOKING: @{triggerBody()?[\'customerName\']} needs service @{triggerBody()?[\'serviceDate\']}'
        }
      },
      {
        step: 2,
        action: 'Post to Teams',
        connector: 'Microsoft Teams',
        operation: 'Post Urgent Card',
        inputs: {
          channel: 'General',
          card: {
            title: '🚨 EMERGENCY BOOKING',
            color: 'FF0000',
            sections: 'Booking details'
          }
        }
      },
      {
        step: 3,
        action: 'Check Team Availability',
        connector: 'Office 365 Outlook',
        operation: 'Get Free/Busy',
        inputs: {
          users: ['ann@', 'anna@', 'rene@', 'tianqi@'],
          time: '@{triggerBody()?[\'serviceDate\']}'
        }
      },
      {
        step: 4,
        action: 'Auto-Assign Team',
        connector: 'Control',
        operation: 'Apply to Each',
        inputs: {
          foreach: '@{outputs(\'Check_Team_Availability\')}',
          action: 'Assign first available'
        }
      }
    ]
  }
};

/**
 * Power Automate Connection References
 * These need to be configured in Power Platform
 */
export const CONNECTIONS = {
  office365: {
    name: 'Office 365 Outlook',
    account: 'schedule@auraspringcleaning.com'
  },
  dynamics365: {
    name: 'Dynamics 365',
    environment: 'org829637ae.crm.dynamics.com'
  },
  sharepoint: {
    name: 'SharePoint',
    site: 'https://adminaccountbcd.sharepoint.com/sites/AuraSpringCleaningTeams'
  },
  teams: {
    name: 'Microsoft Teams',
    webhook: process.env.TEAMS_WEBHOOK_URL
  },
  twilio: {
    name: 'Twilio',
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
  },
  stripe: {
    name: 'Stripe',
    apiKey: process.env.STRIPE_SECRET_KEY
  }
};

/**
 * Export flow templates for Power Automate import
 */
export function exportFlowTemplate(flowName: keyof typeof POWER_AUTOMATE_FLOWS) {
  const flow = POWER_AUTOMATE_FLOWS[flowName];
  
  return {
    name: flow.name,
    description: flow.description,
    trigger: flow.trigger,
    actions: flow.actions,
    connections: CONNECTIONS,
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };
}

export default {
  POWER_AUTOMATE_FLOWS,
  CONNECTIONS,
  exportFlowTemplate
};