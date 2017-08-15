FROM microsoft/aspnetcore:2.0.0
ARG source
RUN echo "source: $source"
WORKDIR /app
COPY ${source:-bin/Debug/netcoreapp2.0/publish} .
ENV ASPNETCORE_URLS http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "FlexPTLBGEWeb.dll"]