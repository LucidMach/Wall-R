#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>

#define firebaseDBurl "wall-r-default-rtdb.asia-southeast1.firebasedatabase.app"
#define firebaseSecret "AGSPvg4x4Mje6HdEHTxToRcSywxyd4K0SIaNBXOm"

#define ssid "Nukalas"
#define password "885623277"

FirebaseData fill_data;

void setup()
{
  Serial.begin(115200);

  WiFi.begin(ssid,password);
  while(WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }

  Firebase.begin(firebaseDBurl,firebaseSecret);
}

void loop()
{
  // Serial.println("Firebase Connected");

  int value = random(0,100);
  Serial.println(value);
  delay(100);
  
  Firebase.setInt(fill_data,"/0",value);
}
