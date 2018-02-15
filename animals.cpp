#include <iostream>
#include <string>

using namespace std;
class Animal {
protected:
  string name;
public:
  virtual void act() = 0;
};

class AquaticAnimal : public Animal {
public:
  AquaticAnimal(string n) {
    Animal::name = n;
  }

  void act() {
    cout << name << " : swim in ocean." << endl;
  }
};

class LandAnimal : public Animal {
public:
  LandAnimal(string n) {
    Animal::name = n;
  }

  virtual void doSpecificTask() = 0;

  void act() {
    cout << "walk on land." << endl;
    doSpecificTask();
  }
};

class Dog : public LandAnimal {
public:
  Dog(string n) : LandAnimal(n) {}

  void doSpecificTask() {
    cout << name << " : Bark and bite." << endl;
  }
};

class Cat : public LandAnimal {
public:
  Cat(string n) : LandAnimal(n) {}

  void doSpecificTask() {
    cout << name << " : Scratch and sulk." << endl;
  }
};

using namespace std;
int main() {
  Animal *animal = new Dog(string("Sheru"));
  animal->act();
  delete(animal);
  animal = new Cat(string("Kutty"));
  animal->act();
  delete(animal);
  animal = new AquaticAnimal("Mean");
  animal->act();
  delete(animal);
  return 0;
}
