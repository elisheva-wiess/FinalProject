using Bl.Api;
using Bl.Services;
using Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
    public class BlManager : IBlManager
    {
        public IPatientBl patientBl{ get; }

        public BlManager(IDalManager dalManager)
        {
            patientBl = new PatientBlServices(dalManager.patientDal);
        }
    }
}


//using Bl.Api;
//using Bl.Services;
//using Dal;
//using AutoMapper; // ודא שאתה מוסיף את הספרייה המתאימה אם אתה משתמש ב-AutoMapper
//using System;

//namespace Bl
//{
//    public class BlManager : IBlManager
//    {
//        public IPatientBl patientBl { get; }

//        public BlManager(IDalManager dalManager, IMapper mapper) // הוסף את IMapper כפרמטר
//        {
//            patientBl = new PatientBlServices(dalManager.patientDal, mapper); // העבר את mapper
//        }
//    }
//}
