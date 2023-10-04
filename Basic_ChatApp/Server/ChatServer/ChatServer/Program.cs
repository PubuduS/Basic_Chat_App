using ChatServer.Hubs;


var builder = WebApplication.CreateBuilder(args);
var policyName = "defaultCorsPolicy";

// This one somehow work on Chrome but fails on Firefox.
builder.Services.AddCors( options =>
{
    options.AddPolicy( policyName, builder => {
        builder.WithOrigins("https://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// Adding SignalR to Services.
builder.Services.AddSignalR();

var app = builder.Build();

if( app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Cors Policy
app.UseCors( policyName );

// This is our Endpoint
app.MapHub<ChatHub>("/chathub");

app.Run();
