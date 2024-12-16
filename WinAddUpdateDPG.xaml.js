using DPGDesktop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using static DPGDesktop.Classes.ManagerCity;
using static DPGDesktop.Classes.ManagerDPG;

namespace DPGDesktop.Wins
{
    /// <summary>
    /// Логика взаимодействия для WinAddUpdateDPG.xaml
    /// </summary>
    public partial class WinAddUpdateDPG : Window
    {
        public ModelDPG dpg { get; set; } = null;
        public WinAddUpdateDPG(ModelDPG dpg = null)
        {
            InitializeComponent();
            cbIsActual.ItemsSource = new List<string>() { "Актуальна", "Не актуальна" };
            cbIsActual.SelectedIndex = 0;
            if (dpg != null)
            {
                this.dpg = dpg;
                Title = "ГТП: обновление";
                btnAddUpdate.Content = "Обновить";
                tbTitle.Text = "Обновить ГТП";
                tbId.Text = dpg.Id.ToString();
                tbId.IsEnabled = false;
                tbCharCode.Text = dpg.CharCode;
                tbName.Text = dpg.Name;
                if (dpg.IsActual == "Актуальна")
                    cbIsActual.SelectedIndex = 0;
                else
                    cbIsActual.SelectedIndex = 1;
            }
            else
                spToCollapse.Visibility = Visibility.Collapsed;
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            var result = Task.Run(() => GetCities()).Result;
            if (result == true)
            {
                cbCity.ItemsSource = Cities.ConvertAll(x => x.Name);
                if (dpg != null)
                    cbCity.SelectedIndex = Cities.FirstOrDefault(x => x.Name == dpg.CityName).Id - 1;
                else
                    cbCity.SelectedIndex = 0;
            }
        }

        private void btnAddUpdate_Click(object sender, RoutedEventArgs e)
        {
            bool actuality;
            if (cbIsActual.SelectedIndex == 0)
                actuality = true;
            else actuality = false;


            if (dpg != null)
            {
                if (string.IsNullOrWhiteSpace(tbName.Text))
                {
                    MessageBox.Show("Название - непустое поле", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }
                if (tbCharCode.Text.Length != 8 || !CheckLatin(tbCharCode.Text))
                {
                    MessageBox.Show("8-значный код - поле длиной 8 символов, содержащий в себе только латиницу и цифры.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }
                var obj = new PostModelDPG(dpg.Id, tbName.Text, tbCharCode.Text, actuality, cbCity.SelectedIndex + 1);
                var result = Task.Run(() => PutDPG(obj)).Result;
                DialogResult = result;
                if (result) Close();
                return;
            }
            else
            {
                if (string.IsNullOrWhiteSpace(tbName.Text))
                {
                    MessageBox.Show("Название - непустое поле.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }
                if (tbCharCode.Text.Length != 8 || !CheckLatin(tbCharCode.Text))
                {
                    MessageBox.Show("8-значный код - поле длиной 8 символов, содержащий в себе только латиницу и цифры.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }
                var obj = new PostModelDPG(0, tbName.Text, tbCharCode.Text, actuality, cbCity.SelectedIndex + 1);
                var result = Task.Run(() => PostDPG(obj)).Result;
                DialogResult = result;
                if (result) Close();
                return;
            }
        }

        private bool CheckLatin(string str)
        {
            string allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            foreach (char c in str)
            {
                if (!allowedChars.Contains(c))
                    return false;
            }
            return true;
        }
    }
}
