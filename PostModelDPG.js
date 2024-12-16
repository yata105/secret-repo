using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DPGDesktop.Models
{
    public class PostModelDPG
    {
        public PostModelDPG(int id, string name, string charCode, bool isActual, int idCity)
        {
            Id = id;
            Name = name;
            CharCode = charCode;
            IsActual = isActual;
            IdCity = idCity;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string CharCode { get; set; }
        public bool IsActual { get; set; }
        public int IdCity { get; set; }
    }
}