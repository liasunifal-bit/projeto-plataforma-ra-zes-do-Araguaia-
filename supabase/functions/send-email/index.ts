import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS Preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject, body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.gmail.com";
    const smtpPort = Number(Deno.env.get("SMTP_PORT") || "465");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS"); // App Password do Gmail do admin

    console.log(`Diagnostic: Host=${smtpHost}, Port=${smtpPort}, User="${smtpUser}", PassLength=${smtpPass?.length}, PassDefined=${!!smtpPass}`);

    if (!smtpUser || !smtpPass) {
      return new Response(
        JSON.stringify({ error: "SMTP credentials (SMTP_USER/SMTP_PASS) not configured in Supabase Secrets" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Converte as quebras de linha em <br /> para o template HTML
    const formattedBody = body.replace(/\n/g, "<br />");
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              background-color: #F5F0E6; /* Cor Sand do front-end */
              margin: 0;
              padding: 0;
              color: #2D5A27; /* Cor principal */
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 10px 15px -3px rgba(45, 90, 39, 0.1), 0 4px 6px -4px rgba(45, 90, 39, 0.05);
              border: 1px solid #E5DFD3;
            }
            .header {
              background-color: #2D5A27; /* Verde escuro --raizes-primary */
              color: #ffffff;
              padding: 35px 20px;
              text-align: center;
              border-bottom: 4px solid #E8732E; /* Linha laranja --raizes-accent */
            }
            .header img {
              max-height: 80px;
              display: block;
              margin: 0 auto 12px auto;
            }
            .header h1 {
              margin: 0;
              font-size: 20px;
              font-weight: 800;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }
            .content {
              padding: 40px 30px;
              line-height: 1.7;
              font-size: 15px;
              color: #3F3F46;
            }
            .content p {
              margin-top: 0;
              margin-bottom: 16px;
            }
            .footer {
              background-color: #FAF6EE;
              padding: 25px;
              text-align: center;
              font-size: 11px;
              color: #7E7C77;
              border-top: 1px solid #E5DFD3;
            }
            .footer p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://ngxclqhopsrzvyasbtcj.supabase.co/storage/v1/object/public/avatars/logo.png" alt="Logo Raízes do Araguaia" />
              <h1>Plataforma Raízes do Araguaia</h1>
            </div>
            <div class="content">
              ${formattedBody}
            </div>
            <div class="footer">
              <p>Este é um e-mail automático enviado pela Plataforma Raízes do Araguaia.</p>
              <p>&copy; 2026 Raízes do Araguaia. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: to,
      subject: subject,
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal Server Error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
