using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DPGDesktop.Models
{
    public class ModelMeter
    {
        public ModelMeter(long id, string isPositive, string isActual, int? idDPG)
        {
            Id = id;
            IsPositive = isPositive;
            IsActual = isActual;
            IdDPG = idDPG;
        }
        public long Id { get; set; }
        public string IsPositive { get; set; }
        public string IsActual { get; set; }
        public int? IdDPG { get; set; }
    }
}