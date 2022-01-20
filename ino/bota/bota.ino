#include <NewPing.h>
#include <Servo.h>
Servo Lser;

#define SONAR_NUM     4            //define Number of ultrasonic sensor used
#define MAX_DISTANCE 800            //Max distance between the object and robot
#define PING_INTERVAL 33

#define trigPin1 4             // define pin connections for sensor and motor
#define echoPin1 5
#define trigPin2 2
#define echoPin2 3
#define trigPin3 6
#define echoPin3 7
#define trigPin4 8
#define echoPin4 9

#define LM1      10
#define LM2      11
#define RM1      12
#define RM2      13

int MapL;
int rangeFront = 0;
int rangeWall  = 0;
int lidrange;
int levelrange;
int lidFlag = 1;
int levelFlag = 0;



NewPing sonar[SONAR_NUM] = {                                // Define a Newping array to measure the distance
  NewPing(trigPin1, echoPin1, MAX_DISTANCE),
  NewPing(trigPin2, echoPin2, MAX_DISTANCE),
  NewPing(trigPin3, echoPin3, MAX_DISTANCE),
  NewPing(trigPin4, echoPin4, MAX_DISTANCE)
};

void setup()               // setup function to make pin configuration to define whether it is input or output

{
  Lser.attach(A0);
  Serial.begin(9600);
  int i;
  pinMode(LM1, OUTPUT);
  pinMode(LM2, OUTPUT);
  pinMode(RM1, OUTPUT);
  pinMode(RM2, OUTPUT);
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  digitalWrite(trigPin1, LOW);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  digitalWrite(trigPin2, LOW);
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin3, INPUT);
  digitalWrite(trigPin3, LOW);
  pinMode(trigPin4, OUTPUT);
  pinMode(echoPin4, INPUT);
  digitalWrite(trigPin4, LOW);
  Lser.write(0);

}

int toCloseWall = 40;
int toFarWall = 2000;
int toCloseFront = 500;


void loop()

{
  levelrange = readlevel();
  
  if (levelrange < 300)
  {
    levelFlag = 1;
    lidFlag = 0;
  }
  if (lidFlag)
  {
    lidrange = readlid();
    if (lidrange <200 )
    {
      Lser.write(180);
      delay(5000);
      Lser.write(-180);
    }
  }
      //Serial.println(lidrange);
    //Serial.print(" lid");
    MapL = map(levelrange,300,1650,100,0);
   Serial.println(MapL);
   //Serial.println(" level");
  if (0)
  {
Main:
    delay(100);
    rangeFront = readRangeFront();  // Read the sensor value by the function call
    //Serial.print(rangeFront);
    // Serial.print(" Front");
    Serial.println();
    rangeWall = readRangeWall();
    // Serial.print(rangeWall);
    // Serial.print(" Wall");
    Serial.println();
    if (rangeFront <= 20)         //As the sensor value reads the small values we are manipulating to high values
    {
      rangeFront = 3000;
    }
    if (rangeWall <= 40)
    {
      rangeWall = 3000;
    }
    Serial.print(rangeWall);
    Serial.print(" Wall");
    Serial.print(rangeFront);
    Serial.print(" Front");
    if (rangeFront < toCloseFront)  //Condition to check whether front sensor is close to robot
    {
      motor_stop();
      delay(500);
      drive_backward();
      delay(800);
      Serial.print(" Drive Back");
      turn_right();
      Serial.print(" Right Turn");
      Serial.println();
      delay(2200);
      if (levelFlag)
        goto Main;

    }
    if (rangeWall > toCloseWall && rangeWall < toFarWall) //condition to check distance measured by front and side sensor is maintained correctly
    {
      drive_forward();
      Serial.print(" Drive Forward");
      Serial.println();
      if (levelFlag)
        goto Main;
    }
    if (rangeWall < toCloseWall)                       //condition to check side wall is close to robot
    {
      delay(100);
      //turn_left();
      turn_right();
      delay(500);
      Serial.print(" Turn Left");
      drive_forward();
      Serial.print(" Drive Forward");
      Serial.println();
      if (levelFlag)
        goto Main;
    }
    if (rangeWall > toFarWall)                         //condition to check robot is far from side wall
    {
      delay(100);
      //turn_right();
      turn_left();
      Serial.print(" Turn Right");
      delay(500);
      drive_forward();
      Serial.print(" Drive Forward");
      Serial.println();
      if (levelFlag)
        goto Main;
    }
  }
  delay(100);
}



void motor_stop()                                  // function to stop the robot
{
  digitalWrite(LM1, LOW);
  digitalWrite(LM2, LOW);
  digitalWrite(RM1, LOW);
  digitalWrite(RM2, LOW);
}
void drive_forward()                               // function to drive the robot forward
{
  digitalWrite(LM1 , HIGH);
  digitalWrite(LM2, LOW);
  digitalWrite(RM1, HIGH);
  digitalWrite(RM2, LOW);
}
void drive_backward()                             // function to drive the robot backward
{
  digitalWrite(LM1, LOW);
  digitalWrite(LM2, HIGH);
  digitalWrite(RM1, LOW);
  digitalWrite(RM2, HIGH);
}
void turn_left()                                  // function to turn the robot left
{
  digitalWrite(LM1, HIGH);
  digitalWrite(LM2, LOW);
  digitalWrite(RM1, LOW);
  digitalWrite(RM2, LOW);
}
void turn_right()                                     //function to turn the robot right
{
  digitalWrite(LM1, LOW);
  digitalWrite(LM2, LOW);
  digitalWrite(RM1, HIGH);
  digitalWrite(RM2, LOW);
}


int readRangeFront()                                 //function to read the front sensor value

{

  delay(50);

  unsigned rangeFront = sonar[0].ping();

  sonar[0].timer_stop();

  return rangeFront;

}

int readRangeWall()                                 // function to read the left sensor value

{

  delay(50);

  unsigned rangeWall = sonar[1].ping();

  sonar[1].timer_stop();

  return rangeWall;

}
int readlid()                                 // function to read the left sensor value

{

  delay(50);

  unsigned lidrange = sonar[2].ping();

  sonar[2].timer_stop();

  return lidrange;
}
int readlevel()                                 // function to read the left sensor value

{

  delay(50);

  unsigned levelrange = sonar[3].ping();

  sonar[3].timer_stop();

  return levelrange;
}
