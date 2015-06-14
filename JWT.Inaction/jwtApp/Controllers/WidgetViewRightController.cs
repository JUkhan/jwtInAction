﻿using AspNetIdentity.WebApi.Controllers;
using jwtApp.Infrastructure;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace jwtApp.Controllers
{
    [RoutePrefix("api/widgetRight")]
    [Authorize]
    public class WidgetViewRightController : BaseApiController
    {
        [Authorize(Roles = "Admin")]
        [Route("getWidgetViewRights")]
        public IHttpActionResult GetWidgeViewtRights()
        {

            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                return Ok(dbContext.WidgetViewRights.ToList());
            }
        }
        [Authorize(Roles = "Admin")]
        [Route("getUsers")]
        public IHttpActionResult GetUsers()
        {

            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                var list = (from u in dbContext.Users select new { UserId = u.UserName, Name = u.UserName }).ToList();
                return Ok(list);
            }
        }
        [Authorize(Roles = "Admin")]
        [Route("getRoles")]
        public IHttpActionResult GetRoles()
        {

            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                var list = (from u in dbContext.Roles select new { RoleId = u.Name, Name = u.Name }).ToList();
                return Ok(list);
            }
        }
        [Authorize(Roles = "Admin")]
        [Route("create")]
        public async Task<IHttpActionResult> Create(WidgetViewRight widget)
        {

            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                dbContext.WidgetViewRights.Add(widget);
                await dbContext.SaveChangesAsync();
            }
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [Route("update")]
        public async Task<IHttpActionResult> Update(WidgetViewRight widget)
        {

            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                WidgetViewRight temp = await dbContext.WidgetViewRights.FindAsync(widget.Id);
                if (temp != null)
                {
                    temp.RoleId = widget.RoleId = widget.RoleId;
                    temp.UserId = widget.UserId;
                    temp.OnlyView = widget.OnlyView;
                    temp.Create = widget.Create;
                    temp.Update = widget.Update;
                    temp.Delete = widget.Delete;
                    await dbContext.SaveChangesAsync();
                }
            }
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [Route("delete")]
        public async Task<IHttpActionResult> Delete(WidgetViewRight widget)
        {
            using (ApplicationDbContext dbContext = ApplicationDbContext.Create())
            {
                WidgetViewRight temp = await dbContext.WidgetViewRights.FindAsync(widget.Id);

                if (temp != null)
                {
                    dbContext.WidgetViewRights.Remove(temp);
                    await dbContext.SaveChangesAsync();
                }


            }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [Route("getWidgets")]
        public IHttpActionResult GetWidgets()
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + "\\Scripts\\Components";
            List<string> list = new List<string>();

            DirectoryInfo dir = new DirectoryInfo(path);
            foreach (var item in dir.GetDirectories())
            {
                list.Add(item.Name);
            }
            var temp = (from u in list select new { WidgetId = u, WidgetName = u }).ToList();
            return Ok(temp);
        }
    }
}