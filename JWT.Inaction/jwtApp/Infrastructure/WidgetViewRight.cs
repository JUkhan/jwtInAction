using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace jwtApp.Infrastructure
{
    public class WidgetViewRight
    {
        public int Id { get; set; }

        [MaxLength(128)]
        [Required]
        public string RoleId { get; set; }

        [MaxLength(128)]       
        public string UserId { get; set; }

        [MaxLength(128)]
        [Required]
        public string WidgetName { get; set; }

        public bool OnlyView { get; set; }

        public bool Create { get; set; }
        public bool Update { get; set; }
        public bool Delete { get; set; }
    }
}