import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CharacterCard } from './components/CharacterCard';
import { EquipmentScreen } from './components/EquipmentScreen';
import { useCharacters } from './hooks/useCharacters';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import './index.css';

function App() {
  const [attackPower, setAttackPower] = useState<number>(25);
  
  const {
    characters,
    selectedCharId,
    equipmentCharacter,
    handleSelectCharacter,
    handleOpenEquipment,
    handleCloseEquipment,
    handleEquip,
  } = useCharacters(attackPower);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">キャラクターリスト</h1>
          
          <Card className="w-full md:w-auto">
            <CardContent className="p-4 flex items-center gap-4">
              <Label htmlFor="attackPower" className="whitespace-nowrap font-semibold">
                攻撃力:
              </Label>
              <Input
                id="attackPower"
                type="number"
                min="0"
                value={attackPower}
                onChange={(e) => setAttackPower(Number(e.target.value) || 0)}
                className="w-24 font-bold text-primary"
              />
            </CardContent>
          </Card>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            <AnimatePresence mode="popLayout">
              {characters.map(char => (
                <CharacterCard 
                  key={char.id} 
                  character={char} 
                  onSelect={handleSelectCharacter}
                  onOpenEquipment={handleOpenEquipment}
                />
              ))}
            </AnimatePresence>
          </div>
        </main>

        {selectedCharId && (
          <footer className="fixed bottom-8 left-1/2 -translate-x-1/2">
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              現在選択中: <span className="font-bold underline">
                {characters.find(c => c.id === selectedCharId)?.name}
              </span>
            </div>
          </footer>
        )}

        {equipmentCharacter && (
          <EquipmentScreen
            character={equipmentCharacter}
            onEquip={handleEquip}
            onClose={handleCloseEquipment}
          />
        )}
      </div>
    </div>
  );
}

export default App;
