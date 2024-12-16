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
using System.Windows.Navigation;
using System.Windows.Shapes;
using static DPGDesktop.Classes.ManagerDPG;
using static DPGDesktop.Classes.ManagerCity;
using DPGDesktop.Models;

namespace DPGDesktop.Wins
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class WinDPG : Window
    {
        public WinDPG()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender = null, RoutedEventArgs e = null)
        {
            var result = Task.Run(() => GetDPGs()).Result;
            if (result == true)
            {
                dGridDPG.ItemsSource = DPGs;
            }
            else if (result == false)
            {
                Application.Current.Shutdown();
                return;
            }
            var citiesResult = Task.Run(() => GetCities()).Result;
            if (!citiesResult)
            {
                Close();
            }
        }

        private void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            WinAddUpdateDPG win = new WinAddUpdateDPG();
            if (win.ShowDialog() == true)
                Window_Loaded();
        }

        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            if (dGridDPG.SelectedItems.Count > 1)
            {
                MessageBox.Show("Для обновления ГТП выберите только одну строку в таблице.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }
            var item = dGridDPG.SelectedItem as ModelDPG;
            if (item == null)
            {
                MessageBox.Show("Для обновления ГТП выберите ее в таблице слева.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            WinAddUpdateDPG win = new WinAddUpdateDPG(item);
            if (win.ShowDialog() == true)
                Window_Loaded();
        }

        private void btnClose_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private void btnSeacrhById_Click(object sender, RoutedEventArgs e)
        {
            int id;
            if (int.TryParse(tbId.Text, out id))
            {
                bool result = Task.Run(() => GetDPGById(id)).Result;
                if (result)
                    dGridDPG.ItemsSource = DPGs;
            }
        }

        private void btnShowAll_Click(object sender, RoutedEventArgs e)
        {
            Window_Loaded();
        }

        private void btnWinBookCopy_Click(object sender, RoutedEventArgs e)
        {
            WinMeter win = new WinMeter();
            win.Show();
            Close();
        }
    }
}
