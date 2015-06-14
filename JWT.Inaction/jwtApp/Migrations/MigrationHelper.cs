using jwtApp.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace jwtApp.Migrations
{
    public class MigrationHelper
    {
        public static void Migrate()
        {
            Database.SetInitializer<ApplicationDbContext>(null);
            var migratorConfig = new Migrations.Configuration();
            var dbMigrator = new DbMigrator(migratorConfig);
            dbMigrator.Update();
        }
    }
}