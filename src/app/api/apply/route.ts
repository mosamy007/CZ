import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { xUsername, walletAddress } = body;

    // Validate inputs
    if (!xUsername || typeof xUsername !== "string" || xUsername.trim().length < 3) {
      return NextResponse.json(
        { error: "Invalid X Username. Minimum length is 3 characters." },
        { status: 400 }
      );
    }

    if (!xUsername.startsWith("@")) {
      return NextResponse.json(
        { error: "X Username must start with '@'." },
        { status: 400 }
      );
    }

    const isWalletValid = /^0x[a-fA-F0-9]{40}$/.test(walletAddress || "");
    if (!isWalletValid) {
      return NextResponse.json(
        { error: "Invalid Ethereum Wallet Address. Must start with '0x' and be 42 characters long." },
        { status: 400 }
      );
    }

    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      return NextResponse.json(
        { error: "Backend Google Script URL not configured in environment variables." },
        { status: 500 }
      );
    }

    // Forward the request to Google Apps Script server-side (immune to CORS)
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: xUsername,
        wallet: walletAddress,
      }),
    });

    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error(`Google Apps Script did not return JSON (Status ${response.status}):`, responseText);
      return NextResponse.json(
        { error: `Google Script Access Denied (Status ${response.status}). Please make sure the Apps Script deployment has 'Who has access' set to 'Anyone'.` },
        { status: response.status }
      );
    }
    
    // Log the submission status for administrator visibility
    console.log(`[Cowz whitelist submission] X Username: ${xUsername}, Wallet: ${walletAddress}, Status:`, data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in whitelist registration proxy:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application." },
      { status: 500 }
    );
  }
}
