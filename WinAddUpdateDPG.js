<Window x:Class="DPGDesktop.Wins.WinAddUpdateDPG"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:DPGDesktop.Wins"
        mc:Ignorable="d" Loaded="Window_Loaded"
        Title="ГТП: добавление" Height="420" Width="260">
    <Grid>
        <StackPanel Orientation="Vertical" HorizontalAlignment="Center" VerticalAlignment="Center">
            <TextBlock x:Name="tbTitle" FontSize="16" Margin="0,0,0,10">Добавить ГТП</TextBlock>
            <StackPanel x:Name="spToCollapse" Orientation="Vertical" Margin="0,10,0,10" >
                <TextBlock HorizontalAlignment="Left">Код</TextBlock>
                <TextBox x:Name="tbId" Width="200px" IsEnabled="False"/>
            </StackPanel>
            <StackPanel Orientation="Vertical" Margin="0,10,0,10" >
                <TextBlock HorizontalAlignment="Left">Название</TextBlock>
                <TextBox x:Name="tbName" Width="200px"/>
            </StackPanel>
            <StackPanel Orientation="Vertical" Margin="0,10,0,10" >
                <TextBlock HorizontalAlignment="Left">8-символьный код</TextBlock>
                <TextBox x:Name="tbCharCode" MaxLength="8" Width="200px"/>
            </StackPanel>
            <StackPanel Orientation="Vertical" Margin="0,10,0,10" >
                <TextBlock HorizontalAlignment="Left">Актуальность</TextBlock>
                <ComboBox x:Name="cbIsActual" Width="200px"/>
            </StackPanel>
            <StackPanel Orientation="Vertical" Margin="0,10,0,10" >
                <TextBlock HorizontalAlignment="Left">Город</TextBlock>
                <ComboBox x:Name="cbCity" Width="200px"/>
            </StackPanel>
            <Button HorizontalAlignment="Center" IsDefault="True" Margin="0,20,0,0" Width="100" x:Name="btnAddUpdate" Click="btnAddUpdate_Click">Добавить</Button>
        </StackPanel>
    </Grid>
</Window>
