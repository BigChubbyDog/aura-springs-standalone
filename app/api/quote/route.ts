import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { serviceType, squareFootage, addons, frequency } = await request.json();

    // ADJUSTED Base pricing (reduced from original)
    const basePrices: { [key: string]: number } = {
      signature: 200,      // Down from 299
      regular: 200,        // Base clean
      deep: 350,          // Down from 499
      movein: 550,        // Down from 649
      moveout: 550,       // Move-out clean
      maintenance: 150,   // Down from 199
      airbnb: 175,        // Airbnb turnover
      commercial: 250,    // Commercial clean
    };

    let basePrice = basePrices[serviceType] || 200;

    // Size multiplier (slightly adjusted)
    const sizeMultipliers: { [key: string]: number } = {
      '500-1000': 1.0,
      '1000-1500': 1.15,   // Reduced from 1.2
      '1500-2000': 1.25,   // New tier
      '2000-2500': 1.35,   // Reduced from 1.4
      '2500-3000': 1.45,   // New tier
      '3000-3500': 1.55,   // Reduced from 1.6
      '3500+': 1.7,        // Reduced from 1.8
    };

    const sizeMultiplier = sizeMultipliers[squareFootage] || 1.0;
    basePrice *= sizeMultiplier;

    // Add-ons pricing
    const addonPrices: { [key: string]: number } = {
      ovenCleaning: 35,
      fridgeCleaning: 35,
      windowsInterior: 45,
      laundryFold: 25,
      garageCleaning: 50,
      patioBalcony: 30,
      organizingCloset: 40,
      organizingPantry: 30,
      carpetSpotTreat: 35,
      petHairRemoval: 25,
    };

    let addonTotal = 0;
    if (addons && Array.isArray(addons)) {
      addonTotal = addons.reduce((sum, addon) => {
        if (typeof addon === 'string') {
          return sum + (addonPrices[addon] || 0);
        }
        return sum + (addon.price || 0);
      }, 0);
    }

    let total = basePrice + addonTotal;

    // Frequency discounts (keeping same percentages)
    const discounts: { [key: string]: number } = {
      weekly: 0.15,      // 15% off
      biweekly: 0.10,    // 10% off
      'bi-weekly': 0.10, // Alternative spelling
      monthly: 0.05,     // 5% off
      onetime: 0,        // No discount
    };

    const discount = discounts[frequency] || 0;
    const discountAmount = (basePrice + addonTotal) * discount;
    total *= (1 - discount);

    // Austin zone multiplier (if location provided)
    // Reserved for future zone-based pricing
    // const zoneMultipliers: { [key: string]: number } = {
    //   downtown: 1.2,     // Downtown premium
    //   westlake: 1.25,    // Westlake Hills premium
    //   domain: 1.15,      // Domain area
    //   eastaustin: 1.05,  // East Austin
    //   southcongress: 1.1, // South Congress
    //   default: 1.0,
    // };

    return NextResponse.json({
      basePrice: Math.round(basePrice),
      addonTotal,
      discount: Math.round(discountAmount),
      total: Math.round(total),
      frequency,
      serviceType,
      breakdown: {
        service: basePrices[serviceType] || 200,
        sizeMultiplier: sizeMultiplier,
        frequencyDiscount: `${(discount * 100).toFixed(0)}%`,
        savings: Math.round(discountAmount),
      },
      success: true,
    });
  } catch (error) {
    console.error('Quote calculation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate quote',
        success: false,
      },
      { status: 500 }
    );
  }
}