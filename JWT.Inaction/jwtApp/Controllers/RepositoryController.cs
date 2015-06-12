using jwtApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace jwtApp.Controllers
{
    public class RepositoryController : Controller
    {       
        public async Task<JsonResult> GetTableData(SpModel spModel)
        {            
            try
            {
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
                return Json(await CommonRepository.GetScalerValue(spModel));
            }
            catch (Exception ex)
            {
                return Json(new { msg = ex.ToString() });
            }
        }
    }
}