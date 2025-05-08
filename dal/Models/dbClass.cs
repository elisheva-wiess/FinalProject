using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class dbClass : DbContext
{
    public dbClass()
    {
    }

    public dbClass(DbContextOptions<dbClass> options)
        : base(options)
    {
    }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<AvailableAppointment> AvailableAppointments { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<Specialization> Specializations { get; set; }

    public virtual DbSet<Therapist> Therapists { get; set; }

    public virtual DbSet<TherapistHour> TherapistHours { get; set; }

    public virtual DbSet<TherapistSpecialization> TherapistSpecializations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename='H:\\ENDTOENDPROJECT\\FINALPROJECT\\DAL\\DATA\\DATABASE.MDF';Integrated Security=True;Connect Timeout=30");

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //    var databasePath = Path.Combine(AppContext.BaseDirectory, "DAL", "DATA", "DATABASE.MDF");
    //    optionsBuilder.UseSqlServer($"Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename='{databasePath}';Integrated Security=True;Connect Timeout=30");
    //}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__Appointm__D06765FED85E8D04");

            entity.Property(e => e.AppointmentId)
                .ValueGeneratedNever()
                .HasColumnName("appointmentId");
            entity.Property(e => e.AppointmentDate)
                .HasColumnType("datetime")
                .HasColumnName("appointmentDate");
            entity.Property(e => e.PatientId)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("patientId");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("status");
            entity.Property(e => e.TherapistId)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("therapistId");

            entity.HasOne(d => d.Patient).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__patie__628FA481");

            entity.HasOne(d => d.Therapist).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__thera__6383C8BA");
        });

        modelBuilder.Entity<AvailableAppointment>(entity =>
        {
            entity.HasKey(e => e.AvailableId).HasName("PK__Availabl__23EA8994D298EF1E");

            entity.Property(e => e.AvailableId)
                .ValueGeneratedNever()
                .HasColumnName("availableId");
            entity.Property(e => e.AvailableDate)
                .HasColumnType("datetime")
                .HasColumnName("availableDate");
            entity.Property(e => e.TherapistId)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("therapistId");
            entity.Property(e => e.TimeSlot).HasColumnName("timeSlot");

            entity.HasOne(d => d.Therapist).WithMany(p => p.AvailableAppointments)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Available__thera__6477ECF3");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.HasKey(e => e.PatientsId).HasName("PK__tmp_ms_x__42574E86BE6D9820");

            entity.Property(e => e.PatientsId)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("patientsId");
            entity.Property(e => e.Address)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("address");
            entity.Property(e => e.BirthDate).HasColumnName("birthDAte");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("firstName");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("gender");
            entity.Property(e => e.HealthInsurance)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("Health insurance");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("lastName");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("phoneNumber");
        });

        modelBuilder.Entity<Specialization>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC07EB2C6F64");

            entity.ToTable("Specialization");

            entity.Property(e => e.Description)
                .HasMaxLength(400)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("description");
            entity.Property(e => e.SpecializationName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("specializationName");
        });

        modelBuilder.Entity<Therapist>(entity =>
        {
            entity.HasKey(e => e.TherapistsId).HasName("PK__tmp_ms_x__15D8DB2311D97990");

            entity.Property(e => e.TherapistsId)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("therapistsId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("lastName");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("phoneNumber");
            entity.Property(e => e.Salary).HasColumnName("salary");
            entity.Property(e => e.YearsOfExperience).HasColumnName("yearsOfExperience");
        });

        modelBuilder.Entity<TherapistHour>(entity =>
        {
            entity.HasKey(e => e.TherapistHoursId).HasName("PK__Therapis__B538AF36BD4FB976");

            entity.Property(e => e.TherapistHoursId).ValueGeneratedNever();
            entity.Property(e => e.DayOfWeek)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("dayOfWeek");
            entity.Property(e => e.EndTime).HasColumnName("endTime");
            entity.Property(e => e.StartTime).HasColumnName("startTime");
            entity.Property(e => e.TherapistId)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("therapistId");

            entity.HasOne(d => d.Therapist).WithMany(p => p.TherapistHours)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Therapist__thera__656C112C");
        });

        modelBuilder.Entity<TherapistSpecialization>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Therapis__3213E83F1CA32D6E");

            entity.ToTable("TherapistSpecialization");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.SpecializationId).HasColumnName("specializationId");
            entity.Property(e => e.TherapistId)
                .HasMaxLength(10)
                .IsFixedLength()
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("therapistId");

            entity.HasOne(d => d.Specialization).WithMany(p => p.TherapistSpecializations)
                .HasForeignKey(d => d.SpecializationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Therapist__speci__03F0984C");

            entity.HasOne(d => d.Therapist).WithMany(p => p.TherapistSpecializations)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Therapist__thera__02FC7413");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
