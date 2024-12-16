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
using System.Xml.Linq;
using static DPGDesktop.Classes.ManagerMeter;

namespace DPGDesktop.Wins
{
    /// <summary>
    /// Логика взаимодействия для WinAddUpdateMeter.xaml
    /// </summary>
    public partial class WinAddUpdateMeter : Window
    {
        public ModelMeter Meter { get; set; } = null;
        public WinAddUpdateMeter(ModelMeter meter = null)
        {
            InitializeComponent();
            cbIsActual.ItemsSource = new List<string>() { "Актуален", "Не актуален" };
            cbIsPositive.ItemsSource = new List<string>() { "Позитивный", "Негативный" };
            cbIsActual.SelectedIndex = 0;
            cbIsPositive.SelectedIndex = 0;

            if (meter != null)
            {
                Meter = meter;
                tbId.Text = meter.Id.ToString();
                tbIdDPG.Text = meter.IdDPG.ToString();
                if (meter.IsActual == "Актуален")
                    cbIsActual.SelectedIndex = 0;
                else
                    cbIsActual.SelectedIndex = 1;
                if (meter.IsPositive == "Позитивный")
                    cbIsPositive.SelectedIndex = 0;
                else
                    cbIsPositive.SelectedIndex = 1;
            }
            else
                tbId.IsEnabled = true;
        }

        private void btnAddUpdate_Click(object sender, RoutedEventArgs e)
        {
            bool actuality;
            if (cbIsActual.SelectedIndex == 0)
                actuality = true;
            else actuality = false;
            bool positivity;
            if (cbIsPositive.SelectedIndex == 0)
                positivity = true;
            else positivity = false;
            long id;
            int idDPG;
            if (long.TryParse(tbId.Text, out id) && (int.TryParse(tbIdDPG.Text, out idDPG) || string.IsNullOrWhiteSpace(tbIdDPG.Text)))
            {
                PostModelMeter meter = new PostModelMeter(id, positivity, actuality, idDPG);
                if (Meter != null)
                {
                    bool result = Task.Run(() => PutMeter(meter)).Result;
                    DialogResult = result;
                    if (result) Close();
                    return;
                }
                else
                {
                    bool result = Task.Run(() => PostMeter(meter)).Result;
                    DialogResult = result;
                    if (result) Close();
                    return;
                }
            }
        }
    }
}
