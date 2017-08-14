FROM microsoft/aspnetcore:1.1.2
ARG source
RUN echo "source: $source"
WORKDIR /app
COPY ${source:-bin/Debug/netcoreapp1.1/publish} .
ENV ASPNETCORE_URLS http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "FlexPTLBGEWeb.dll"]