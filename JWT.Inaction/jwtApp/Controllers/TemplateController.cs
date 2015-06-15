using jwtApp.Infrastructure;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
namespace jwtApp.Controllers
{
    public class TemplateController : Controller
    {
        [Route("template/{name}")]
        public async Task GetTemplate(string name)
        {
            
            string filePath = GetFilePath(name);
            Response.ContentType = "text/html";
            name = name.ToLower();
            if (!System.IO.File.Exists(filePath))
            {
                Response.Write("<div class=\"not-found\">Template file not found.</div>");
                return;
            }
            string enableWidgetAuthorize = string.IsNullOrEmpty(ConfigurationManager.AppSettings["EnableWidgetAuthorize"]) ? "false" : ConfigurationManager.AppSettings["EnableWidgetAuthorize"];
            enableWidgetAuthorize = enableWidgetAuthorize.ToLower();
            if (name == "login" || name == "signup" || enableWidgetAuthorize=="false")
            {
                await FileStreaming(filePath);
                return;
            }
            if (!User.Identity.IsAuthenticated)
            {
                Response.Write("<div class=\"not-auth\">Not Authenticated.</div>");
                return;
            }
            
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var roles = (from claim in claimsIdentity.Claims where claim.Type == ClaimTypes.Role select claim.Value).ToArray();
            string userName=User.Identity.Name;
            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                var res = dbContext.WidgetViewRights.FirstOrDefault(widget => widget.WidgetName.ToLower() == name && (roles.Contains(widget.RoleId) || widget.UserId == userName));
                if (res != null)
                {
                    await FileStreaming(filePath);
                }
                else
                {
                    Response.Write(string.Format("<div class=\"not-auth\">{0}</div>", ConfigurationManager.AppSettings["WidgetNotAuthorizedMessage"]));
                }
            }
           
        }

        private async Task FileStreaming(string filePath)
        {
            using (Stream stream = new FileStream(path: filePath,
           mode: System.IO.FileMode.Open,
           share: System.IO.FileShare.Read,
           access: System.IO.FileAccess.Read))
            {
                await stream.CopyToAsync(Response.OutputStream);
            }

        }
        
        private string GetFilePath(string name)
        {
            string root = Server.MapPath("~");
            if (!root.EndsWith("\\"))
            {
                root += "\\";
            }
            if (name.EndsWith("__LAYOUT__"))
            {
                name = name.Substring(0,name.LastIndexOf("__LAYOUT__"));
                return root + string.Format("Scripts\\Layouts\\{0}\\{0}.html", name);
            }
            return root + string.Format("Scripts\\Components\\{0}\\{0}.html", name);
        }
       

    }
}