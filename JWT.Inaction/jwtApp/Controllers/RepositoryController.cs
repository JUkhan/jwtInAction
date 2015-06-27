using jwtApp.Infrastructure;
using jwtApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
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
                    return Json(new { msg = string.Format("'{0}' is not authorized.", spModel.spName) });
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
                        return Json(JsonConvert.SerializeObject(await CommonRepository.GetScalarValue(spModel)));
                    }
                    return Json(new { msg = string.Format("'{0}' is not authorized.", spModel.spName) });
                }
                return Json(await CommonRepository.GetScalarValue(spModel));
            }
            catch (Exception ex)
            {
                return Json(new { msg = ex.ToString() });
            }
        }
        public bool HasPermission(string spName)
        {
            if (!spName.Contains('_')) return true;

            bool actionCreate = spName.Contains("create");
            bool actionUpdate = spName.Contains("update");
            bool actionDelete = spName.Contains("delete");

            if (!(actionCreate || actionUpdate || actionDelete)) return true;

            string widgetName = spName.Substring(0, spName.IndexOf('_'));

            bool res = false;
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;
            var roles = (from claim in claimsIdentity.Claims where claim.Type == ClaimTypes.Role select claim.Value).ToArray();
            string userName = User.Identity.Name;
            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                var list = dbContext.WidgetViewRights.Where(widget => widget.WidgetName.ToLower() == widgetName && (roles.Contains(widget.RoleId) || widget.UserId == userName)).ToList();
                if (list != null && list.Count > 0)
                {
                    
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
            return enableWidgetAuthorize.ToLower() == "true";
        }

        public async Task<JsonResult> FileUpload(string spName, string spParams, HttpPostedFileBase file)
        {
            List<SpParam> spParamList = JsonConvert.DeserializeObject<List<SpParam>>(spParams) ?? new List<SpParam>();
            string fileName = string.Empty;
            if (file != null)
            { 
                fileName = Guid.NewGuid().ToString();

                string ext = file.FileName.Substring(file.FileName.LastIndexOf('.') + 1);
                spParamList.Add(new SpParam { name = "fileName", value = fileName + '.' + ext });

                spParamList.Add(new SpParam { name = "contentType", value = file.ContentType });


                string localPath = Path.Combine(Server.MapPath("~/") + GetPath(spParamList), fileName + '.' + ext);
                file.SaveAs(localPath);
            }
            SpModel spModel = new SpModel();
            spModel.spName = spName;
            spModel.spParams = spParamList;
            try
            {
                if (IsEnableWidgetAuthorize())
                {
                    if (HasPermission(spModel.spName.ToLower()))
                    {
                        return Json(JsonConvert.SerializeObject(await CommonRepository.GetScalarValue(spModel)));
                    }
                    return Json(new { msg = string.Format("'{0}' is not authorized.", spModel.spName) });
                }
                return Json(await CommonRepository.GetScalarValue(spModel));
            }
            catch (Exception ex)
            {
                return Json(new { msg = ex.ToString() });
            }
        }

        private string GetPath(List<SpParam> spParamList)
        {
            SpParam param = spParamList.FirstOrDefault(item => item.name.ToLower() == "path");
            if (param != null) return param.value.ToString();
            return "";
        }

        //public async Task<ActionResult> ExportExcel(SpModel spModel)
        //{
            //We load the data
            //var dataInventory = _inventoryService.InventoryListByPharmacyId(pId);
            //string xml = String.Empty;
            //XmlDocument xmlDoc = new XmlDocument();

            //XmlSerializer xmlSerializer = new XmlSerializer(dataInventory.GetType());

            //using (MemoryStream xmlStream = new MemoryStream())
            //{
            //    xmlSerializer.Serialize(xmlStream, dataInventory);
            //    xmlStream.Position = 0;
            //    xmlDoc.Load(xmlStream);
            //    xml = xmlDoc.InnerXml;
            //}

            //var fName = string.Format("Inventory-{0}", DateTime.Now.ToString("s"));
        //    DataTable data = await CommonRepository.GetTableData(spModel);
           
        //    byte[] fileContents = Encoding.UTF8.GetBytes(xml);

        //    return File(fileContents, "application/vnd.ms-excel", fName);

        //}
    }
}