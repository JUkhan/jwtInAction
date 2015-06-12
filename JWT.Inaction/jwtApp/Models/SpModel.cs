using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace jwtApp.Models
{
    public class SpModel
    {
        public string spName { get; set; }
        public List<SpParam> spParams { get; set; }
    }
    public class SpParam
    {
        public string name { get; set; }
        public object value  { get; set; }
    }
}