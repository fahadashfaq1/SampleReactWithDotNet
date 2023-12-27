using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ProductInventoryManager.Server.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        // Constructor to configure in-memory database
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
