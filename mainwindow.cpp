#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QDebug>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
      , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    setWindowTitle("SoundInjector");

    QStringList arguments{"test.py"};
    python_process.startDetached("python", arguments, QCoreApplication::applicationDirPath());
    while (python_process.state() == QProcess::Running) {
        qDebug() << python_process.readAllStandardOutput();
    }
}

MainWindow::~MainWindow()
{
    python_process.kill();
    delete ui;
}

