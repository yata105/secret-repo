<Window x:Class="DPGDesktop.Wins.WinDPG"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:DPGDesktop"
        mc:Ignorable="d" Loaded="Window_Loaded"
        Title="ГТП: главная" Height="500" Width="900">
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="240"/>
            <ColumnDefinition Width="*" />
        </Grid.ColumnDefinitions>
        <Grid Grid.Column="0">
            <StackPanel Orientation="Vertical" VerticalAlignment="Center" HorizontalAlignment="Center">
                <StackPanel Orientation="Vertical" Margin="0,10,0,10" Width="200">
                    <TextBlock HorizontalAlignment="Left">Найти по коду</TextBlock>
                    <TextBox x:Name="tbId" Width="200"></TextBox>
                    <Button x:Name="btnSeacrhById"  Click="btnSeacrhById_Click" Width="100" HorizontalAlignment="Right" Margin="0,10,0,0">Найти</Button>
                </StackPanel>
                <StackPanel Orientation="Horizontal" HorizontalAlignment="Center" Margin="0,40,0,0">
                    <Button x:Name="btnAdd" Width="100" Margin="10,0,10,0" Click="btnAdd_Click">Добавить</Button>
                    <Button x:Name="btnUpdate" Width="100" Margin="10,0,10,0" Click="btnUpdate_Click">Обновить</Button>
                </StackPanel>
                <Button x:Name="btnWinBookCopy" Width="120" Click="btnWinBookCopy_Click" Margin="0,80,0,15">Открыть счетчики</Button>
            </StackPanel>
        </Grid>
        <Grid Grid.Column="1" Margin="20">
            <Grid.RowDefinitions>
                <RowDefinition Height="40"/>
                <RowDefinition Height="*"/>
            </Grid.RowDefinitions>
            <StackPanel Grid.Row="0" Orientation="Horizontal" HorizontalAlignment="Center" VerticalAlignment="Center">
                <TextBlock FontSize="14" Margin="0,0,30,0">Список ГТП</TextBlock>
                <Button x:Name="btnRefresh" Width="100" Click="btnShowAll_Click">Сбросить</Button>
            </StackPanel>
            <DataGrid x:Name="dGridDPG" Grid.Row="1" AutoGenerateColumns="False" IsReadOnly="True">
                <DataGrid.Columns>
                    <DataGridTextColumn Binding="{Binding Id}" Header="Код" Width="40" />
                    <DataGridTextColumn Binding="{Binding Name}" Header="Название" Width="*" />
                    <DataGridTextColumn Binding="{Binding CharCode}" Header="8-симв. код" Width="90" />
                    <DataGridTextColumn Binding="{Binding IsActual}" Header="Актуальность" Width="110" />
                    <DataGridTextColumn Binding="{Binding CityName}" Header="Город" Width="130" />
                </DataGrid.Columns>
            </DataGrid>
        </Grid>
    </Grid>
</Window>
