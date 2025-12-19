import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface Switch {
  id: number;
  name: string;
  manufacturer: string;
  ports: number;
  speed: string;
  poe: boolean;
  price: number;
  image: string;
  features: string[];
}

const switches: Switch[] = [
  {
    id: 1,
    name: 'Enterprise Switch Pro 48',
    manufacturer: 'Cisco',
    ports: 48,
    speed: '10 Гбит/с',
    poe: true,
    price: 125000,
    image: '🔷',
    features: ['Layer 3', 'PoE+', 'Stackable', 'SFP+']
  },
  {
    id: 2,
    name: 'Managed Switch 24',
    manufacturer: 'HPE',
    ports: 24,
    speed: '1 Гбит/с',
    poe: true,
    price: 45000,
    image: '🔶',
    features: ['Layer 2', 'PoE', 'Web Management']
  },
  {
    id: 3,
    name: 'Core Switch 5000',
    manufacturer: 'Cisco',
    ports: 48,
    speed: '40 Гбит/с',
    poe: false,
    price: 280000,
    image: '🔷',
    features: ['Layer 3', 'QSFP+', 'Redundant PSU', 'Stackable']
  },
  {
    id: 4,
    name: 'Access Switch 16',
    manufacturer: 'Mikrotik',
    ports: 16,
    speed: '1 Гбит/с',
    poe: true,
    price: 18000,
    image: '🔸',
    features: ['Layer 2', 'PoE', 'Fanless']
  },
  {
    id: 5,
    name: 'Distribution Switch 32',
    manufacturer: 'HPE',
    ports: 32,
    speed: '10 Гбит/с',
    poe: true,
    price: 95000,
    image: '🔶',
    features: ['Layer 3', 'PoE+', 'SFP+', 'VLAN']
  },
  {
    id: 6,
    name: 'Edge Switch 8',
    manufacturer: 'Mikrotik',
    ports: 8,
    speed: '1 Гбит/с',
    poe: false,
    price: 8500,
    image: '🔸',
    features: ['Layer 2', 'Compact', 'SFP']
  }
];

const manufacturers = ['Cisco', 'HPE', 'Mikrotik'];

const Index = () => {
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 300000]);
  const [poeOnly, setPoeOnly] = useState(false);
  const [activeSection, setActiveSection] = useState('catalog');

  const scrollToCatalog = () => {
    setActiveSection('catalog');
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog-section');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const openDocumentation = () => {
    setActiveSection('docs');
  };

  const filteredSwitches = switches.filter(sw => {
    const manufacturerMatch = selectedManufacturers.length === 0 || selectedManufacturers.includes(sw.manufacturer);
    const priceMatch = sw.price >= priceRange[0] && sw.price <= priceRange[1];
    const poeMatch = !poeOnly || sw.poe;
    return manufacturerMatch && priceMatch && poeMatch;
  });

  const toggleManufacturer = (manufacturer: string) => {
    setSelectedManufacturers(prev =>
      prev.includes(manufacturer)
        ? prev.filter(m => m !== manufacturer)
        : [...prev, manufacturer]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Network" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">SwitchPro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveSection('catalog')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('specs')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'specs' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Характеристики
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-foreground'
                }`}
              >
                О компании
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Контакты
              </button>
              <button
                onClick={() => setActiveSection('docs')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'docs' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Документация
              </button>
            </nav>
          </div>
        </div>
      </header>

      {activeSection === 'catalog' && (
        <>
          <section className="bg-gradient-to-b from-white to-secondary py-20">
            <div className="container mx-auto px-4 text-center animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Профессиональные сетевые коммутаторы
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Надежное оборудование для построения корпоративных сетей любой сложности
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="text-base" onClick={scrollToCatalog}>
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Перейти к каталогу
                </Button>
                <Button size="lg" variant="outline" className="text-base" onClick={openDocumentation}>
                  <Icon name="FileText" size={20} className="mr-2" />
                  Документация
                </Button>
              </div>
            </div>
          </section>

          <section id="catalog-section" className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <aside className="md:col-span-1 animate-scale-in">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Фильтры</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3 flex items-center">
                            <Icon name="Building2" size={18} className="mr-2" />
                            Производитель
                          </h4>
                          <div className="space-y-2">
                            {manufacturers.map(manufacturer => (
                              <div key={manufacturer} className="flex items-center space-x-2">
                                <Checkbox
                                  id={manufacturer}
                                  checked={selectedManufacturers.includes(manufacturer)}
                                  onCheckedChange={() => toggleManufacturer(manufacturer)}
                                />
                                <label
                                  htmlFor={manufacturer}
                                  className="text-sm cursor-pointer"
                                >
                                  {manufacturer}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium mb-3 flex items-center">
                            <Icon name="Banknote" size={18} className="mr-2" />
                            Цена
                          </h4>
                          <div className="space-y-3">
                            <Slider
                              value={priceRange}
                              onValueChange={setPriceRange}
                              max={300000}
                              step={5000}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>{priceRange[0].toLocaleString()} ₽</span>
                              <span>{priceRange[1].toLocaleString()} ₽</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium mb-3 flex items-center">
                            <Icon name="Zap" size={18} className="mr-2" />
                            Функции
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="poe"
                              checked={poeOnly}
                              onCheckedChange={(checked) => setPoeOnly(checked as boolean)}
                            />
                            <label htmlFor="poe" className="text-sm cursor-pointer">
                              Только с PoE
                            </label>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setSelectedManufacturers([]);
                            setPriceRange([0, 300000]);
                            setPoeOnly(false);
                          }}
                        >
                          Сбросить фильтры
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </aside>

                <div className="md:col-span-3">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-muted-foreground">
                      Найдено: <span className="font-semibold text-foreground">{filteredSwitches.length}</span> моделей
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSwitches.map((sw, index) => (
                      <Card key={sw.id} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <CardContent className="p-6">
                          <div className="text-6xl mb-4 text-center">{sw.image}</div>
                          <div className="mb-2">
                            <Badge variant="secondary" className="mb-2">{sw.manufacturer}</Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-3">{sw.name}</h3>
                          
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center text-muted-foreground">
                              <Icon name="Boxes" size={16} className="mr-2" />
                              {sw.ports} портов
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Icon name="Gauge" size={16} className="mr-2" />
                              {sw.speed}
                            </div>
                            {sw.poe && (
                              <div className="flex items-center text-primary">
                                <Icon name="Zap" size={16} className="mr-2" />
                                PoE
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {sw.features.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          <Separator className="my-4" />

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold">{sw.price.toLocaleString()} ₽</div>
                            </div>
                            <Button size="sm">
                              <Icon name="ShoppingCart" size={16} className="mr-1" />
                              Купить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'specs' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Технические характеристики</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="font-semibold text-xl mb-2">Производительность</h3>
                  <p className="text-muted-foreground">От 1 до 40 Гбит/с на порт. Коммутация без блокировки для максимальной пропускной способности.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="font-semibold text-xl mb-2">Безопасность</h3>
                  <p className="text-muted-foreground">802.1X аутентификация, ACL, port security, защита от DDoS атак и storm control.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🌐</div>
                  <h3 className="font-semibold text-xl mb-2">Управление</h3>
                  <p className="text-muted-foreground">Web-интерфейс, CLI, SNMP, centralised management. Поддержка стекирования и резервирования.</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-2xl mb-6">Сравнение серий</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Параметр</th>
                        <th className="text-left py-3 px-4">Access</th>
                        <th className="text-left py-3 px-4">Distribution</th>
                        <th className="text-left py-3 px-4">Core</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-muted-foreground">Количество портов</td>
                        <td className="py-3 px-4">8-24</td>
                        <td className="py-3 px-4">24-48</td>
                        <td className="py-3 px-4">48+</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-muted-foreground">Скорость портов</td>
                        <td className="py-3 px-4">1 Гбит/с</td>
                        <td className="py-3 px-4">1-10 Гбит/с</td>
                        <td className="py-3 px-4">10-40 Гбит/с</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-muted-foreground">Layer</td>
                        <td className="py-3 px-4">Layer 2</td>
                        <td className="py-3 px-4">Layer 2/3</td>
                        <td className="py-3 px-4">Layer 3</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-muted-foreground">PoE</td>
                        <td className="py-3 px-4">Опционально</td>
                        <td className="py-3 px-4">PoE+</td>
                        <td className="py-3 px-4">Нет</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-muted-foreground">Стекирование</td>
                        <td className="py-3 px-4">Нет</td>
                        <td className="py-3 px-4">Да</td>
                        <td className="py-3 px-4">Да</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">О компании</h2>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  SwitchPro — ведущий поставщик сетевого оборудования для корпоративного сегмента. 
                  Мы работаем с 2010 года и помогаем компаниям строить надежные сетевые инфраструктуры.
                </p>
                <p className="text-lg text-muted-foreground">
                  Наша команда состоит из сертифицированных инженеров с опытом внедрения проектов 
                  для компаний различного масштаба — от малого бизнеса до крупных корпораций.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Реализованных проектов</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15</div>
                  <p className="text-muted-foreground">Лет на рынке</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-muted-foreground">Техническая поддержка</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-2xl mb-4">Наши преимущества</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Icon name="CheckCircle2" size={24} className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Официальная гарантия</h4>
                      <p className="text-muted-foreground">Все оборудование поставляется с официальной гарантией производителя от 1 до 5 лет</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Icon name="CheckCircle2" size={24} className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Техническая поддержка</h4>
                      <p className="text-muted-foreground">Круглосуточная поддержка от сертифицированных специалистов</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Icon name="CheckCircle2" size={24} className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Услуги внедрения</h4>
                      <p className="text-muted-foreground">Проектирование, настройка и ввод в эксплуатацию под ключ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'docs' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Документация</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">📘</div>
                  <h3 className="font-semibold text-xl mb-2">Руководства</h3>
                  <p className="text-muted-foreground mb-4">Пошаговые инструкции по установке и настройке оборудования</p>
                  <Button variant="outline" className="w-full">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="font-semibold text-xl mb-2">Техническая документация</h3>
                  <p className="text-muted-foreground mb-4">Спецификации, схемы подключения и параметры</p>
                  <Button variant="outline" className="w-full">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="font-semibold text-xl mb-2">База знаний</h3>
                  <p className="text-muted-foreground mb-4">FAQ, решение типовых проблем и рекомендации</p>
                  <Button variant="outline" className="w-full">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Перейти
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="font-semibold text-2xl mb-6">Быстрый старт</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mr-4">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Распаковка и проверка</h4>
                      <p className="text-muted-foreground">Убедитесь, что в комплекте присутствуют все компоненты: коммутатор, блок питания, кабели, документация. Проверьте отсутствие повреждений.</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mr-4">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Физическое подключение</h4>
                      <p className="text-muted-foreground">Установите коммутатор в стойку или на стол. Подключите блок питания. Соедините консольный порт с компьютером для первичной настройки.</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mr-4">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Базовая конфигурация</h4>
                      <p className="text-muted-foreground">Запустите терминал (PuTTY, SecureCRT). Войдите в режим настройки, установите hostname, IP-адрес управления, пароли администратора.</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mr-4">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Настройка VLAN и портов</h4>
                      <p className="text-muted-foreground">Создайте необходимые VLAN, назначьте порты в нужные VLAN. Настройте trunk-порты для межкоммутаторных связей. Сохраните конфигурацию.</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mr-4">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Тестирование и мониторинг</h4>
                      <p className="text-muted-foreground">Проверьте связность сети командой ping. Настройте SNMP для мониторинга. Включите логирование событий. Проверьте работу всех портов.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-4 flex items-center">
                    <Icon name="BookOpen" size={24} className="text-primary mr-2" />
                    Популярные темы
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="ChevronRight" size={16} className="mr-2" />
                        Настройка VLAN и trunk-портов
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="ChevronRight" size={16} className="mr-2" />
                        Конфигурация PoE и управление питанием
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="ChevronRight" size={16} className="mr-2" />
                        Резервирование и стекирование
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="ChevronRight" size={16} className="mr-2" />
                        Настройка QoS и приоритизация трафика
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="ChevronRight" size={16} className="mr-2" />
                        Обновление прошивки и резервное копирование
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-4 flex items-center">
                    <Icon name="Video" size={24} className="text-primary mr-2" />
                    Видео-инструкции
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="Play" size={16} className="mr-2" />
                        Первое подключение и базовая настройка (12:34)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="Play" size={16} className="mr-2" />
                        Монтаж в стойку и кабельная инфраструктура (8:15)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="Play" size={16} className="mr-2" />
                        Настройка SNMP мониторинга (10:20)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="Play" size={16} className="mr-2" />
                        Диагностика и устранение неисправностей (15:47)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-primary hover:underline">
                        <Icon name="Play" size={16} className="mr-2" />
                        Оптимизация производительности сети (11:30)
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Контакты</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="font-semibold text-xl mb-6">Свяжитесь с нами</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Icon name="MapPin" size={24} className="text-primary mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Адрес</h4>
                        <p className="text-muted-foreground">Москва, ул. Профсоюзная, 65</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Icon name="Phone" size={24} className="text-primary mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Телефон</h4>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                        <p className="text-muted-foreground text-sm">Пн-Пт: 9:00 - 18:00</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Icon name="Mail" size={24} className="text-primary mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Email</h4>
                        <p className="text-muted-foreground">info@switchpro.ru</p>
                        <p className="text-muted-foreground">sales@switchpro.ru</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Icon name="Clock" size={24} className="text-primary mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Техподдержка 24/7</h4>
                        <p className="text-muted-foreground">support@switchpro.ru</p>
                        <p className="text-muted-foreground">+7 (495) 123-45-68</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="font-semibold text-xl mb-6">Отправить запрос</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Телефон</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Сообщение</label>
                      <textarea
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                        placeholder="Ваш вопрос или комментарий"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Network" size={24} className="text-primary" />
              <span className="font-semibold">SwitchPro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SwitchPro. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;