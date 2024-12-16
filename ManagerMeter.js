using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using DPGDesktop.Models;
using Newtonsoft.Json;

namespace DPGDesktop.Classes
{
    public class ManagerMeter
    {
        public static List<ModelMeter> Meters { get; set; }

        public static async Task<bool> GetMeters()
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(Manager.ApiPath + "Meters");

                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        List<ModelMeter> meterList = JsonConvert.DeserializeObject<List<ModelMeter>>(json);
                        Meters = meterList;
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

        public static async Task<bool> GetMeterById(int id)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(Manager.ApiPath + "Meters/" + id);

                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        ModelMeter meter = JsonConvert.DeserializeObject<ModelMeter>(json);
                        Meters = new List<ModelMeter>() { meter };
                        return true;
                    }
                    else
                    {
                        MessageBox.Show("Не удалось найти счетчик с таким кодом.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
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
        public static async Task<bool> GetMetersByIdDPG(int id)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(Manager.ApiPath + "getMetersByIdDPG?IdDPG=" + id);

                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        List<ModelMeter> meters = JsonConvert.DeserializeObject<List<ModelMeter>>(json);
                        Meters = meters;
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

        public static async Task<bool> PutMeter(PostModelMeter meter)
        {
            try
            {
                string json = JsonConvert.SerializeObject(meter);

                using (HttpClient client = new HttpClient())
                {
                    StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PutAsync(Manager.ApiPath + "Meters/" + meter.Id, content);

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Объект успешно обновлен!");
                        return true;
                    }
                    else
                    {
                        MessageBox.Show($"Не удалось обновить ГТП: {response.StatusCode}", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
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

        public static async Task<bool> PostMeter(PostModelMeter meter)
        {
            try
            {
                string json = JsonConvert.SerializeObject(meter);

                using (HttpClient client = new HttpClient())
                {
                    StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(Manager.ApiPath + "Meters", content);

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Объект успешно создан!");
                        return true;
                    }
                    else
                    {
                        MessageBox.Show($"Не удалось создать ГТП: {response.StatusCode}", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
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
