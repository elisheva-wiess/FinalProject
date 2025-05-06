using Bl;
using Bl.Api;
using Bl.Services;
using Dal.Api;
using Dal.Models;
using Dal.Services;
using Dal;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IBlManager, BlManager>();
builder.Services.AddScoped<IDalManager, DalManager>();
builder.Services.AddScoped<IPatientDal, PatientDallServices>();
builder.Services.AddScoped<IPatientBl, PatientBlServices>();
builder.Services.AddSingleton<dbClass>();

var app = builder.Build();

app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();
app.Run();


