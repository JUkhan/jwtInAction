using jwtApp.Infrastructure;
using jwtApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace jwtApp.Controllers
{
    [Authorize]
    public class RepositoryController : Controller
    {       
        public async Task<JsonResult> GetTableData(SpModel spModel)
        {            
            try
            {
                if (IsEnableWidgetAuthorize())
                {
                    if (HasPermission(spModel.spName.ToLower()))
                    {
                        return Json(JsonConvert.SerializeObject(await CommonRepository.GetTableData(spModel)));
                    }
                    return Json(new { msg = "Not Authorized." });
                }
                return Json(JsonConvert.SerializeObject(await CommonRepository.GetTableData(spModel)));
            }
            catch (Exception ex)
            {
                return Json(new { msg = ex.ToString() });
            }
        }
        public async Task<JsonResult> GetScalarValue(SpModel spModel)
        {            
            try
            {
                if (IsEnableWidgetAuthorize())
                {
                    if (HasPermission(spModel.spName.ToLower()))
                    {
                        return Json(JsonConvert.SerializeObject(await CommonRepository.GetTableData(spModel)));
                    }
                    return Json(new { msg = "Not Authorized." });
                }
                return Json(await CommonRepository.GetScalerValue(spModel));
            }
            catch (Exception ex)
            {
                return Json(new { msg = ex.ToString() });
            }
        }
        public bool HasPermission(string spName)
        {            
            if (!spName.Contains('_')) return true;

            string widgetName = spName.Substring(0, spName.IndexOf('_') );
            
            bool res = false;
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;
            var roles = (from claim in claimsIdentity.Claims where claim.Type == ClaimTypes.Role select claim.Value).ToArray();
            string userName = User.Identity.Name;
            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                var list = dbContext.WidgetViewRights.Where(widget => widget.WidgetName.ToLower() == widgetName && (roles.Contains(widget.RoleId) || widget.UserId == userName)).ToList();
                if (list !=null && list.Count > 0)
                {
                    bool actionCreate = spName.Contains("create");
                    bool actionUpdate = spName.Contains("update");
                    bool actionDelete = spName.Contains("delete");
                    foreach (var item in list)
                    {
                        if (actionCreate && item.Create)
                        {
                            return true;
                        }
                        else if (actionUpdate && item.Update)
                        {
                            return true;
                        }
                        else if (actionDelete && item.Delete)
                        {
                            return true;
                        }
                    }
                }
            }
            return res;
        }
        public bool IsEnableWidgetAuthorize()
        {
            string enableWidgetAuthorize = string.IsNullOrEmpty(ConfigurationManager.AppSettings["EnableWidgetAuthorize"]) ? "false" : ConfigurationManager.AppSettings["EnableWidgetAuthorize"];
           return enableWidgetAuthorize.ToLower()=="true";
        }
    }
}