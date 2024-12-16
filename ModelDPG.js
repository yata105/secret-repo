using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DPGDesktop.Models
{
    public class ModelDPG
    {
        public ModelDPG(int id, string name, string charCode, string isActual, string cityName)
        {
            Id = id;
            Name = name;
            CharCode = charCode;
            IsActual = isActual;
            CityName = cityName;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string CharCode { get; set; }
        public string IsActual { get; set; }
        public string CityName { get; set; }
    }
}