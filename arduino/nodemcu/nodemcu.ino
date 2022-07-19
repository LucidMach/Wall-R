#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>

#define firebaseDBurl "wall-r-default-rtdb.asia-southeast1.firebasedatabase.app"
#define firebaseSecret "AGSPvg4x4Mje6HdEHTxToRcSywxyd4K0SIaNBXOm"

#define ssid "Nukalas_2GEXT"
#define password "885623277"

FirebaseData fill_data;

void setup()
{
  Serial.begin(9600);

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
//   Serial.println("Firebase Connected");

if(Serial.available()>0){
  int value = Serial.parseInt();
  value = (value > 100) ? 100: value;
  value = (value < 0) ? 0 : value; 
  Serial.println(value);
  delay(100);
  
  Firebase.setInt(fill_data,"/0",value);
}
 
}
