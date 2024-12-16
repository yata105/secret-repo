using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using DPGDesktop.Models;

namespace DPGDesktop.Classes
{
    internal class ManagerCity
    {
        public static List<ModelCity> Cities { get; set; }

        public static async Task<bool> GetCities()
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(Manager.ApiPath + "Cities");

                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        List<ModelCity> cityList = JsonConvert.DeserializeObject<List<ModelCity>>(json);
                        Cities = cityList;
                        return true;
                    }
                    else
                    {
                        MessageBox.Show($"Не удалось найти данные: {response.StatusCode}", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Не удалось подключиться к серверу: {ex.Message}", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
        }
    }
}
