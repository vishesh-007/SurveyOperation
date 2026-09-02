# ==========================================
# Stage 1: Build
# ==========================================

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

# Copy project file first
# This allows Docker to cache NuGet restore
COPY ["SurveyOperationBackend.csproj", "./"]

# Restore dependencies
RUN dotnet restore "SurveyOperationBackend.csproj"

# Copy the remaining source code
COPY . .

# Publish the application
RUN dotnet publish "SurveyOperationBackend.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore


# ==========================================
# Stage 2: Production Runtime
# ==========================================

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

# Application will listen on port 8080
EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080
ENV DOTNET_HOSTBUILDER__RELOADCONFIGONCHANGE=false

# Copy published application
COPY --from=build /app/publish .

# Start ASP.NET Core application
ENTRYPOINT ["dotnet", "SurveyOperationBackend.dll"]
