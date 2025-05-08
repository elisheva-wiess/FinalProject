using Bl;
using Bl.Api;
using Bl.Services;
using Dal;
using Dal.Api;
using Dal.Models;
using Dal.Services;

var builder = WebApplication.CreateBuilder(args);

// הוספת שירותים למיכל התלויות
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// רישום שירותים (Dependency Injection)
builder.Services.AddScoped<IBlManager, BlManager>();
builder.Services.AddScoped<IDalManager, DalManager>();
builder.Services.AddScoped<IPatientDal, PatientDallServices>();
builder.Services.AddScoped<IPatientBl, PatientBlServices>();
builder.Services.AddScoped<ITherapistBl, TherapistBlServices>();
builder.Services.AddScoped<ITherapistDal, TherapistDalServices>();
builder.Services.AddSingleton<dbClass>();

var app = builder.Build();

// הפעלת Swagger רק בסביבת פיתוח
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // מבטיח הפניה ל-HTTPS
app.UseRouting();          // מוסיף יכולת ניתוב
app.UseAuthorization();    // שימוש בהרשאות אם צריך

app.MapControllers();

app.Run();




