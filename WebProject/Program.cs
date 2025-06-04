using Bl;
using Bl.Api;
using Bl.Models;
using Bl.Services;
using Dal;
using Dal.Api;
using Dal.Models;
using Dal.Services;
using AutoMapper;


var builder = WebApplication.CreateBuilder(args);

// הוספת שירותים למיכל התלויות
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// רישום שירותים (Dependency Injection)
builder.Services.AddScoped<IBlManager, BlManager>();
builder.Services.AddScoped<IDalManager, DalManager>();
builder.Services.AddScoped<IWebsiteConnectionBl, WebsiteConnectionBlServices>();
builder.Services.AddScoped<IWebsiteConnectionDal, WebsiteConnectionDalServices>();
builder.Services.AddScoped<ISpecializationBl, SpecializationBlServices>();
builder.Services.AddScoped<ISpecializationDal, SpecializationDalServices>();
builder.Services.AddScoped<IAppointmentBl, AppointmentBlServices>();
builder.Services.AddScoped<IAppointmentDal, AppointmentDalServices>();
builder.Services.AddScoped<IPatientDal, PatientDalServices>();
builder.Services.AddScoped<IPatientBl, PatientBlServices>();
builder.Services.AddScoped<ITherapistBl, TherapistBlServices>();
builder.Services.AddScoped<ITherapistDal, TherapistDalServices>();
builder.Services.AddScoped<IPersonalAreaBl, PersonalAreaBlServices>();
builder.Services.AddScoped<IPersonalAreaDal, PersonalAreaDalServices>();
builder.Services.AddSingleton<dbClass>();
builder.Services.AddAutoMapper(typeof(MappingProfile));



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); 
app.UseRouting();
app.UseCors("AllowReactApp");
app.UseAuthorization();   

app.MapControllers();

app.Run();




