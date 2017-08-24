dotnet publish -c release -r win10-x64
Obfuscar.Console.exe Obfuscar.Config.xml
copy bin\release\netcoreapp2.0\win10-x64\publish\obfuscar\FlexPTLBGEWeb.dll bin\release\netcoreapp2.0\win10-x64\publish /y
del bin\release\netcoreapp2.0\win10-x64\publish\obfuscar\* /q
rd bin\release\netcoreapp2.0\win10-x64\publish\obfuscar /q