namespace jwtApp.Migrations
{
    using jwtApp.Infrastructure;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<jwtApp.Infrastructure.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(jwtApp.Infrastructure.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "admin",
                Email = "jukhan8080@gmail.com",
                EmailConfirmed = true,
                FirstName = "Jasim",
                LastName = "Khan",
                Level = 1,
                JoinDate = DateTime.Now.AddYears(-3)
            };

            manager.Create(user, "admin@123");

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new IdentityRole { Name = "SuperAdmin" });
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByName("admin");
            var claims = manager.GetClaims(adminUser.Id);
            if (claims != null && claims.Count() == 0)
            {
                manager.AddClaim(adminUser.Id, new System.Security.Claims.Claim("role", "Admin"));
            }
           // manager.AddToRole(adminUser.Id,  "SuperAdmin");
           // manager.AddToRole(adminUser.Id, "Admin");

            if (context.WidgetViewRights.Count() == 0)
            {
                var widgetViewRight = new WidgetViewRight
                {
                    WidgetName = "WidgetViewRights",
                    RoleId = "Admin",
                    OnlyView = true,
                    Create = true,
                    Update = true,
                    Delete = true
                };

                var userInRoles = new WidgetViewRight
                {
                    WidgetName = "userInRoles",
                    RoleId = "Admin",
                    OnlyView = true,
                    Create = true,
                    Update = true,
                    Delete = true
                };

              var  home = new WidgetViewRight
                {
                    WidgetName = "home",
                    RoleId = "User",
                    OnlyView = true,
                    Create = true,
                    Update = true,
                    Delete = true
                };
               

                var root = new WidgetViewRight
                {
                    WidgetName = "root__LAYOUT__",
                    RoleId = "User",
                    OnlyView = true,
                    Create = true,
                    Update = true,
                    Delete = true
                };
               
                context.WidgetViewRights.Add(widgetViewRight);
                context.WidgetViewRights.Add(userInRoles);
                context.WidgetViewRights.Add(home);
                context.WidgetViewRights.Add(root);

                context.SaveChanges();
            }
        }
    }
}
