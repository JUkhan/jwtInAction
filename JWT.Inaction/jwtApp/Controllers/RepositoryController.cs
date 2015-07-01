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
using System.Text;
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

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> ExportExcel(string spName, string spParams, string fileName)
        {
            SpModel spModel = new SpModel();
            spModel.spName = spName;
            if (string.IsNullOrEmpty(spParams))
            {
                spModel.spParams = JsonConvert.DeserializeObject<List<SpParam>>(spParams);
            }
            else
            {
                spModel.spParams = new List<SpParam>();
            }
            DataTable dataTable = await CommonRepository.GetTableData(spModel);
            
            byte[] fileContents = Encoding.UTF8.GetBytes(await GetXml(dataTable));

            return File(fileContents, "application/vnd.ms-excel", fileName);
            
        }
      
        private Task<string> GetXml(DataTable dt)
        {
            StringBuilder sb = new StringBuilder();
            var worksheet_template = "<?xml version=\"1.0\"?><ss:Workbook xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\">" +
             "<ss:Styles><ss:Style ss:ID=\"1\"><ss:Font ss:Bold=\"1\"/></ss:Style></ss:Styles><ss:Worksheet ss:Name=\"Sheet1\">" +
             "<ss:Table>{{ROWS}}</ss:Table></ss:Worksheet></ss:Workbook>";

            //table column names
            sb.Append("<ss:Row ss:StyleID=\"1\">");
            foreach (var item in dt.Columns)
            {
                sb.AppendFormat("<ss:Cell><ss:Data ss:Type=\"String\">{0}</ss:Data></ss:Cell>", item);
            }
            sb.Append("</ss:Row>");           
            //column values
            
            foreach (DataRow  row in dt.Rows)
            {
                sb.AppendLine();
                sb.Append("<ss:Row>");
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    if (row.IsNull(0))
                    {
                        sb.AppendFormat("<ss:Cell><ss:Data ss:Type=\"String\">{0}</ss:Data></ss:Cell>", "");
                    }
                    else
                    {
                        sb.AppendFormat("<ss:Cell><ss:Data ss:Type=\"String\">{0}</ss:Data></ss:Cell>", row[i].ToString());
                    }
                }
                sb.Append("</ss:Row>");
               
            }
            return Task.FromResult<string>(worksheet_template.Replace("{{ROWS}}", sb.ToString()));
        }
    }
}