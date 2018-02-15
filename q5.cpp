#include <iostream>
#include <vector>

using namespace std;

class Observer;

class Observed {
  vector<Observer *> observers;

public:
  void subscribe(Observer*);
  void notify();
};

class Observer {
public:
  virtual void takeAction() = 0;
};

class Clock : public Observed {
private:
  const unsigned int MAXCOUNT;
public:
  Clock(unsigned int);
  void tick();
};

class Device : public Observer {
protected:
  unsigned int count;

public:
  Device(unsigned int c) : count(c) {}
};

class IncrementerDevice : public Device {
public:
  IncrementerDevice();
  void takeAction();
};

class MultiplierDevice : public Device {
  const unsigned int MULTIPLIER;
public:
  MultiplierDevice(unsigned int);
  void takeAction();
};

/////////////Methods of class Observed ////////////////////
void Observed:: subscribe(Observer* o) {
  observers.push_back(o);
}

void Observed::notify() {
  for (unsigned int i = 0; i < observers.size(); i++) {
    observers[i]->takeAction();
  }
}

/////////////Methods of class Clock //////////////////////
Clock::Clock(unsigned int c) : MAXCOUNT (c) {}

void Clock::tick() {
  for (unsigned int i = 0; i < MAXCOUNT; i++) {
    notify();
  }
}

/////////////Methods of class IncrementerDevice //////////////////////
IncrementerDevice::IncrementerDevice() : Device(0) {}
void IncrementerDevice::takeAction() {
  cout << "Incrementer::count = " << count++ << endl;
}

/////////////Methods of class MultiplierDevice //////////////////////
MultiplierDevice::MultiplierDevice(unsigned int m) : Device(1), MULTIPLIER(m) {}

void MultiplierDevice::takeAction() {
  cout << "Multiplier::count = " << count << endl;
  count *= MULTIPLIER;
}

int main() {
  Clock clock(10);
  IncrementerDevice inc;
  MultiplierDevice mul(2);
  clock.subscribe(&inc);
  clock.subscribe(&mul);
  clock.tick();
  return 0;
}
