using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace jwtApp.Models
{
    public class CommonRepository
    {
        public static Task<DataTable> GetTableData(SpModel spModel)
        {
            DataTable dt = new DataTable();            
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBCONN"].ConnectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand cmd = new SqlCommand(spModel.spName, connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (spModel.spParams != null && spModel.spParams.Count > 0)
                    {
                        foreach (SpParam item in spModel.spParams)
                        {
                            cmd.Parameters.AddWithValue('@'+item.name, item.value);
                        }

                    }
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    {
                        adapter.Fill(dt);
                    }
                }
                catch (Exception ex) { throw ex; }
                
            }
            return Task.FromResult<DataTable>(dt);
        }
        public static Task<object> GetScalerValue(SpModel spModel)
        {
            object res = null;
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBCONN"].ConnectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand cmd = new SqlCommand(spModel.spName, connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (spModel.spParams != null && spModel.spParams.Count > 0)
                    {
                        foreach (SpParam item in spModel.spParams)
                        {
                            cmd.Parameters.AddWithValue('@' + item.name, item.value);
                        }

                    }
                    res =  cmd.ExecuteScalarAsync().Result;
                }
                catch (Exception ex) { throw ex; }

            }
            return Task.FromResult<object>(res);
        }
    }
}