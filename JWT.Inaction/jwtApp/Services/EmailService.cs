using Microsoft.AspNet.Identity;
//using SendGrid;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Net;
using System.Net.Mail;
namespace jwtApp.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }

        // Use NuGet to install SendGrid (Basic C# client lib) 
        private async Task configSendGridasync(IdentityMessage message)
        {
            //var myMessage = new SmtpCliient();
            var myMessage = new MailMessage();
            myMessage.To.Add(message.Destination);
            //myMessage.From = new System.Net.Mail.MailAddress("jukhn007@outlook.com", "Jasim Khan");
            myMessage.Subject = message.Subject;
            myMessage.Body = message.Body;
            myMessage.IsBodyHtml = true; ;

            using (SmtpClient client = new SmtpClient())
            {
                await client.SendMailAsync(myMessage);
            }
            /*
            //var credentials = new NetworkCredential(ConfigurationManager.AppSettings["emailService:Account"], 
            //                                        ConfigurationManager.AppSettings["emailService:Password"]);
            var credentials = new NetworkCredential();
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            if (transportWeb != null)
            {
                await transportWeb.DeliverAsync(myMessage);
            }
            else
            {
                //Trace.TraceError("Failed to create Web transport.");
                await Task.FromResult(0);
            }
             */
        }
    }
}