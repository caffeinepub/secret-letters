import Array "mo:base/Array";
import Char "mo:base/Char";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type Letter = {
    id : Text;
    content : Text;
    template : Text;
    codeHash : Text;
    createdAt : Int;
  };

  type LetterResult = {
    #ok : { content : Text; template : Text; createdAt : Int };
    #err : Text;
  };

  type CreateResult = {
    #ok : Text;
    #err : Text;
  };

  var letters = HashMap.HashMap<Text, Letter>(10, Text.equal, Text.hash);
  var counter : Nat = 0;

  func hashCode(code : Text) : Text {
    var h : Nat32 = 5381;
    for (c in Text.toIter(code)) {
      let charCode = Char.toNat32(c);
      h := (h *% 33) +% charCode;
    };
    Nat32.toText(h);
  };

  func generateId() : Text {
    counter += 1;
    let t = Int.abs(Time.now());
    let combined = t + counter;
    var h : Nat32 = 5381;
    for (c in Text.toIter(Nat.toText(combined))) {
      let charCode = Char.toNat32(c);
      h := (h *% 33) +% charCode;
    };
    let chars = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z","2","3","4","5","6","7","8","9"];
    let len = Array.size(chars);
    var id = "";
    var val = Nat32.toNat(h);
    for (_ in Iter.range(0, 5)) {
      id := id # chars[val % len];
      val := val / len;
    };
    id;
  };

  public func createLetter(content : Text, template : Text, secretCode : Text) : async CreateResult {
    if (Text.size(content) == 0) return #err("Content cannot be empty");
    if (Text.size(secretCode) == 0) return #err("Secret code cannot be empty");
    let id = generateId();
    let letter : Letter = {
      id;
      content;
      template;
      codeHash = hashCode(secretCode);
      createdAt = Time.now();
    };
    letters.put(id, letter);
    #ok(id);
  };

  public query func getLetter(id : Text, secretCode : Text) : async LetterResult {
    switch (letters.get(id)) {
      case null #err("Letter not found");
      case (?letter) {
        if (hashCode(secretCode) == letter.codeHash) {
          #ok({ content = letter.content; template = letter.template; createdAt = letter.createdAt });
        } else {
          #err("Incorrect secret code");
        };
      };
    };
  };
};
