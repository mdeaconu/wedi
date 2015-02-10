@echo off

SET KANGODIR=D:\master\kango_dir
rem SET KANGODIR=D:\__work\wedi\kango_dir

del /q .\output
call "%KANGODIR%\kango.py" build .\