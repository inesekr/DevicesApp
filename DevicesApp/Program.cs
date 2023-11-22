using DevicesApp.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;

namespace DevicesApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(builder.Configuration.GetConnectionString("DevicesAppDbSqlite")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder => builder.WithOrigins("http://localhost:3000") // Replace with your React app's actual URL
                                        .AllowAnyHeader()
                                        .AllowAnyMethod());
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors("AllowReactApp");
            }

            app.UseAuthorization();

            app.UseCors("AllowReactApp"); // Apply CORS policy

            app.MapControllers();

            app.Run();
        }
    }
}