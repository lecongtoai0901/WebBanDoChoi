# Build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy project files
COPY ["backend/DoAn_WebBanDoChoi.csproj", "backend/"]
WORKDIR /src/backend
RUN dotnet restore "DoAn_WebBanDoChoi.csproj"

# Copy source code
COPY backend/ .

# Build and publish
RUN dotnet publish -c Release -o /app/out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 80
EXPOSE 443

ENV ASPNETCORE_URLS=http://+:80
CMD ["dotnet", "DoAn_WebBanDoChoi.dll"]
