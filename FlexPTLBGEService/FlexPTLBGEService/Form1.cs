using Microsoft.Owin.Hosting;
using System;
using System.Configuration;
using System.Windows.Forms;

namespace FlexPTLBGEService
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void Form1_Resize(object sender, EventArgs e)
        {
            if (FormWindowState.Minimized == this.WindowState)
            {
                notifyIcon1.Visible = true;
                this.Hide();
            }
            else if (FormWindowState.Normal == this.WindowState)
            {
                notifyIcon1.Visible = false;
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            WebApp.Start<Startup>(url: ConfigurationManager.AppSettings["baseUrl"]);
            notifyIcon1.ShowBalloonTip(500);
        }
    }
}
