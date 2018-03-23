using Microsoft.EntityFrameworkCore;
using Server.Model;

namespace Server.Context
{
    public class ToDoContext : DbContext
    {
        public DbSet<TaskItem> TaskItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("FileName=./SqlLite/ToDoList.db");
        }
    }
}