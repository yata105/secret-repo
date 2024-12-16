using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DPGDesktop.Models
{
    public class PostModelMeter
    {
        public PostModelMeter(long id, bool isPositive, bool isActual, int? idDPG)
        {
            Id = id;
            IsPositive = isPositive;
            IsActual = isActual;
            IdDPG = idDPG;
        }
        public long Id { get; set; }
        public bool IsPositive { get; set; }
        public bool IsActual { get; set; }
        public int? IdDPG { get; set; }
    }
}