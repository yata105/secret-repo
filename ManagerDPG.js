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
    public class ManagerDPG
    {
        public static List<ModelDPG> DPGs { get; set; }

        public static async Task<bool> GetDPGs()
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(Manager.ApiPath + "DPGs");

                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        List<ModelDPG> dpgList = JsonConvert.DeserializeObject<List<ModelDPG>>(json);
                        DPGs = dpgList;
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

        public static async Task<bool> GetDPGById(int id)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(Manager.ApiPath + "DPGs/" + id);

                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        ModelDPG dpg = JsonConvert.DeserializeObject<ModelDPG>(json);
                        DPGs = new List<ModelDPG>() { dpg };
                        return true;
                    }
                    else
                    {
                        MessageBox.Show("Не удалось найти ГТП с таким кодом.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
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

        public static async Task<bool> GetDPGByIdCity(int idCity)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(Manager.ApiPath + "DPGsByCity?idCity=" + idCity);

                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        ModelDPG dpg = JsonConvert.DeserializeObject<ModelDPG>(json);
                        DPGs = new List<ModelDPG>() { dpg };
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

        public static async Task<bool> PutDPG(PostModelDPG dpg)
        {
            try
            {
                string json = JsonConvert.SerializeObject(dpg);

                using (HttpClient client = new HttpClient())
                {
                    StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PutAsync(Manager.ApiPath + "DPGs/" + dpg.Id, content);

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

        public static async Task<bool> PostDPG(PostModelDPG dpg)
        {
            try
            {
                string json = JsonConvert.SerializeObject(dpg);

                using (HttpClient client = new HttpClient())
                {
                    StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(Manager.ApiPath + "DPGs", content);

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
