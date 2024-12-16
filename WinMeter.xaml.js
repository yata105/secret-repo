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
using static DPGDesktop.Classes.ManagerMeter;
using static DPGDesktop.Classes.ManagerDPG;
using DPGDesktop.Models;

namespace DPGDesktop.Wins
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class WinMeter : Window
    {
        public WinMeter()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender = null, RoutedEventArgs e = null)
        {
            var result = Task.Run(() => GetMeters()).Result;
            if (result == true)
            {
                dGridMeter.ItemsSource = Meters;
            }
            else if (result == false)
            {
                Application.Current.Shutdown();
                return;
            }
        }

        private void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            WinAddUpdateMeter win = new WinAddUpdateMeter();
            if (win.ShowDialog() == true)
                Window_Loaded();
        }

        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            if (dGridMeter.SelectedItems.Count > 1)
            {
                MessageBox.Show("Для обновления счетчика выберите только одну строку в таблице.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }
            var item = dGridMeter.SelectedItem as ModelMeter;
            if (item == null)
            {
                MessageBox.Show("Для обновления счетчика выберите его в таблице слева.", "Внимание!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            WinAddUpdateMeter win = new WinAddUpdateMeter(item);
            if (win.ShowDialog() == true)
                Window_Loaded();
        }

        private void btnSeacrhById_Click(object sender, RoutedEventArgs e)
        {
            int id;
            if (int.TryParse(tbId.Text, out id))
            {
                bool result = Task.Run(() => GetMeterById(id)).Result;
                if (result)
                    dGridMeter.ItemsSource = Meters;
            }
        }

        private void btnSeacrhByIdDPG_Click(object sender, RoutedEventArgs e)
        {
            int id;
            if (int.TryParse(tbIdDPG.Text, out id))
            {
                bool result = Task.Run(() => GetMetersByIdDPG(id)).Result;
                if (result)
                    dGridMeter.ItemsSource = Meters;
            }
        }

        private void btnShowAll_Click(object sender, RoutedEventArgs e)
        {
            Window_Loaded();
        }

        private void btnWinDPG_Click(object sender, RoutedEventArgs e)
        {
            WinDPG win = new WinDPG();
            win.Show();
            Close();
        }
    }
}
